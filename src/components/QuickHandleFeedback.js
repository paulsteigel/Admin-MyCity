import React, {useState, useEffect} from 'react';
import {View, Text, Alert, TouchableWithoutFeedback} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import {CLOSE_POPUP, MARK_REPORTS_OUTDATED} from '../redux/constants';
import {BASE_URL} from '../service';
import RNFetchBlob from 'rn-fetch-blob';

const QuickHandleFeedback = ({item, isSubmit, setIsSubmit}) => {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSubmit) return;
    console.log(fileBase64);
    Axios.post(`${BASE_URL}/admin/feedbacks/quickHandle/${item.id}`, {
      message,
      fileBase64,
      fileName,
    })
      .then(res => {
        if (res.status == 200) {
          Alert.alert('Thành công', 'Xử lý nhanh phản ánh thành công');
          dispatch({
            type: MARK_REPORTS_OUTDATED,
            payload: {isDataOutdated: true},
          });
        } else Alert.alert('Lỗi', 'Xử lý nhanh phản ánh thất bại');
        setIsSubmit(false);
        dispatch({type: CLOSE_POPUP});
      })
      .catch(err =>
        console.log('err quick handle feedback', JSON.stringify(err)),
      );
  }, [isSubmit]);

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
    <View style={{padding: 15}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>Nội dung trả lời</Text>
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
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>Tài liệu đính kèm</Text>
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
  );
};

export default QuickHandleFeedback;
