import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
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
import {navigationPopBack, navigate} from '../service/navigation';
import SimpleToast from 'react-native-simple-toast';

const HandleReport = ({item, id}) => {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [isPermit, setIsPermit] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (isPermit) {
      if (message === '') {
        SimpleToast.show('Chưa nhập nội dung trả lời');
        return;
      }
    }
    dispatch({type: CLOSE_POPUP});
    dispatch({type: OPEN_LOADING_MODAL});
    Axios.post(`${BASE_URL}/admin/feedbacks/handlefeedback`, {
      id,
      feedbackId: item.id,
      message,
      isPermit,
      fileBase64,
      fileName,
      isPublic,
    })
      .then(res => {
        if (res.status == 200) {
          SimpleToast.show('Đã xử lý phản ánh');
          dispatch({
            type: MARK_REPORTS_OUTDATED,
            payload: {isDataOutdated: true},
          });
          navigate('phan_anh_tiep_nhan', {});
        } else SimpleToast.show('Xử lý phản ánh thất bại');
      })
      .catch(err => {
        console.log('handle Report ', JSON.stringify(err));
        dispatch({type: OPEN_ERROR_POPUP});
      })
      .finally(() => {
        dispatch({type: CLOSE_LOADING_MODAL});
      });
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Thuộc thẩm quyền
            </Text>
            <Switch
              value={isPermit}
              onValueChange={value => setIsPermit(value)}
            />
          </View>
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
            // editable={isPermit}
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
          {isPermit && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Công khai phản ánh
              </Text>
              <Switch
                value={isPublic}
                onValueChange={value => setIsPublic(value)}
              />
            </View>
          )}
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

export default HandleReport;
