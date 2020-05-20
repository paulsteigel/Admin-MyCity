import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
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

const HandleReport = ({item, id, isSubmit, setIsSubmit}) => {
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [isPermit, setIsPermit] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSubmit) return;
    dispatch({type: CLOSE_POPUP});
    dispatch({type: OPEN_LOADING_MODAL});
    console.log(item.id, item.id);
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
        } else SimpleToast.show('Xử lý phản ánh thất bại');
      })
      .catch(err => {
        console.log('handle Report ', JSON.stringify(err));
        dispatch({type: OPEN_ERROR_POPUP});
      })
      .finally(() => {
        setIsSubmit(false);
        dispatch({type: CLOSE_LOADING_MODAL});
      });
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Thuộc thẩm quền</Text>
        <Switch value={isPermit} onValueChange={value => setIsPermit(value)} />
      </View>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        {isPermit ? 'Nội dung trả lời' : 'Lý do trả lại'}
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
  );
};

export default HandleReport;
