import React, {useState, useEffect} from 'react';
import {View, Text, Alert, TouchableWithoutFeedback} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import {
  CLOSE_POPUP,
  MARK_REPORTS_OUTDATED,
  OPEN_ERROR_POPUP,
} from '../redux/constants';
import {BASE_URL} from '../service';
import FilePickerManager from 'react-native-file-picker';
const QuickHandleFeedback = ({item, isSubmit, setIsSubmit}) => {
  const [message, setMessage] = useState(item.description);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSubmit) return;
    const payload = new FormData();
    payload.append('message', message);
    payload.append('file', file);
    Axios.interceptors.request.use(request => {
      console.log('Starting Request', request);
      console.log('Payload', request.data);
      return request;
    });
    Axios.post(`${BASE_URL}/admin/feedbacks/quickHandle/${item.id}`, payload)
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
      .catch(err => console.log(err));
  }, [isSubmit]);

  const selectFileAsync = async () => {
    dispatch({type: OPEN_ERROR_POPUP});
    console.log('1');
    FilePickerManager.showFilePicker(null, response => {
      console.log('Response; ', response);
      if (response.didCancel || response.error) return;
      setFile({
        uri: 'file://' + response.path,
        name: response.fileName,
        type: response.type,
      });
    });
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
          {file && (
            <View
              style={{
                flexDirection: 'row',
                padding: 5,
              }}>
              <Icon name="attachment" size={20} style={{marginRight: 5}} />
              <Text numberOfLines={1}>{file.name}</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default QuickHandleFeedback;
