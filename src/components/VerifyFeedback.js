import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Axios from 'axios';
import {BASE_URL} from '../service';
import {useDispatch} from 'react-redux';
import {CLOSE_POPUP, MARK_REPORTS_OUTDATED} from '../redux/constants';

const VerifyFeedback = ({item, isSubmit, setIsSubmit}) => {
  const dispatch = useDispatch();
  const [report, setReport] = useState(item);
  useEffect(() => {
    if (!isSubmit) return;
    Axios.post(`${BASE_URL}/admin/feedbacks/verify/${report.id}`, {
      verificationComment: report.verificationComment,
    })
      .then(res => {
        if (res.status == 200) {
          Alert.alert('Thành công', 'Xác minh phản ánh thành công');
          dispatch({
            type: MARK_REPORTS_OUTDATED,
            payload: {isDataOutdated: true},
          });
        } else {
          Alert.alert('Lỗi', 'Xác minh phản ánh thất bại');
        }
        setIsSubmit(false);
        dispatch({type: CLOSE_POPUP});
      })
      .catch(err => console.log(err));
  }, [isSubmit]);

  return (
    <View style={{padding: 15}}>
      <Text style={{fontSize: 14, marginBottom: 10}}>Ý kiến tổ xác minh</Text>
      <TextInput
        style={{
          borderColor: '#eee',
          borderWidth: 1,
          textAlignVertical: 'top',
          borderRadius: 10,
        }}
        multiline
        numberOfLines={5}
        value={report.verificationComment}
        onChangeText={verificationComment =>
          setReport({...report, verificationComment})
        }
      />
    </View>
  );
};

export default VerifyFeedback;
