import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import {CLOSE_POPUP, MARK_REPORTS_OUTDATED} from '../redux/constants';
import {BASE_URL} from '../service';

const QuickHandleFeedback = ({item, isSubmit, setIsSubmit}) => {
  const [report, setReport] = useState(item);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSubmit) return;
    Axios.post(`${BASE_URL}/admin/feedbacks/quickHandle/${report.id}`, {
      description: report.description,
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
      .catch(err => console.log(err));
  }, [isSubmit]);

  return (
    <View style={{padding: 15}}>
      <Text style={{fontSize: 14, marginBottom: 10}}>Nội dung trả lời</Text>
      <TextInput
        style={{
          borderColor: '#eee',
          borderWidth: 1,
          textAlignVertical: 'top',
          borderRadius: 10,
        }}
        multiline
        numberOfLines={5}
        value={report.description}
        onChangeText={description => setReport({...report, description})}
      />
      <Text>File đính kèm</Text>
    </View>
  );
};

export default QuickHandleFeedback;
