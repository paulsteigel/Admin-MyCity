import React, {useState} from 'react';
import {View, Text, Button, TouchableWithoutFeedback} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import {
  CLOSE_POPUP,
  MARK_REPORTS_OUTDATED,
  OPEN_ERROR_POPUP,
  OPEN_LOADING_MODAL,
  CLOSE_LOADING_MODAL,
} from '../redux/constants';
import {BASE_URL} from '../service';
import RNFetchBlob from 'rn-fetch-blob';
import SimpleToast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

const QuickHandleFeedback = ({item}) => {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      dispatch({type: CLOSE_POPUP});
      dispatch({type: OPEN_LOADING_MODAL});
      const res = await Axios.post(
        `${BASE_URL}/admin/feedbacks/quickHandle/${item.id}`,
        {
          message,
          fileBase64,
          fileName,
        },
      );
      if (res.status === 200) {
        SimpleToast.show('Đã xử lý phản ánh');
        dispatch({
          type: MARK_REPORTS_OUTDATED,
          payload: {isDataOutdated: true},
        });
        navigation.pop();
      } else SimpleToast.show('Xử lý phản ánh thất bại');
    } catch (err) {
      dispatch({type: OPEN_ERROR_POPUP});
      console.log('[err] xu ly nhanh: ', err.message);
    } finally {
      dispatch({type: CLOSE_LOADING_MODAL});
    }
  };

  const selectFileAsync = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFileName(res.name);
      RNFetchBlob.fs
        .readFile(res.uri, 'base64')
        .then(data => {
          setFileBase64(data);
        })
        .catch(err => console.log('react native fetch blob error', err));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        throw err;
      }
    }
  };

  return (
    <>
      <ScrollView>
        <View style={{padding: 15}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Nội dung trả lời
          </Text>
          <TextInput
            style={{
              borderColor: '#eee',
              borderWidth: 1,
              textAlignVertical: 'top',
              borderRadius: 10,
            }}
            multiline
            numberOfLines={5}
            value={message}
            onChangeText={message => setMessage(message)}
          />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Tài liệu đính kèm
          </Text>
          <TouchableWithoutFeedback onPress={selectFileAsync}>
            <View
              style={{
                padding: 10,
              }}>
              <Text>Bấm để chọn file</Text>
              {fileName !== '' && (
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 5,
                  }}>
                  <Icon name="attachment" size={20} style={{marginRight: 5}} />
                  <Text numberOfLines={1}>{fileName}</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderColor: 'lightgreen',
          borderTopWidth: 1,
          paddingVertical: 10,
        }}>
        <Button title="Lưu" color="green" onPress={handleSubmit} />
      </View>
    </>
  );
};

export default QuickHandleFeedback;
