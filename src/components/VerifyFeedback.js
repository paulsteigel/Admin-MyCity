import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import Axios from 'axios';
import {BASE_URL} from '../service';
import {useDispatch} from 'react-redux';
import {
  CLOSE_POPUP,
  MARK_REPORTS_OUTDATED,
  OPEN_LOADING_MODAL,
  CLOSE_LOADING_MODAL,
} from '../redux/constants';
import SimpleToast from 'react-native-simple-toast';

const VerifyFeedback = ({item}) => {
  const dispatch = useDispatch();
  const [report, setReport] = useState(item);
  const handleSubmit = () => {
    dispatch({type: CLOSE_POPUP});
    dispatch({type: OPEN_LOADING_MODAL});
    Axios.post(`${BASE_URL}/admin/feedbacks/verify/${report.id}`, {
      verificationComment: report.verificationComment,
    })
      .then(res => {
        if (res.status == 200) {
          SimpleToast.show('Đã xác minh phản ánh');
          dispatch({
            type: MARK_REPORTS_OUTDATED,
            payload: {isDataOutdated: true},
          });
        } else {
          SimpleToast.show('Xác minh phản ánh thất bại');
        }
      })
      .catch(err => {
        SimpleToast.show('Có lỗi xảy ra: ', err.message);
        console.log(err);
      })
      .finally(() => {
        dispatch({type: CLOSE_LOADING_MODAL});
      });
  };

  return (
    <>
      <ScrollView>
        <View style={{padding: 15}}>
          <Text style={{fontSize: 14, marginBottom: 10}}>
            Ý kiến tổ xác minh
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
            value={report.verificationComment}
            onChangeText={verificationComment =>
              setReport({...report, verificationComment})
            }
          />
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

export default VerifyFeedback;
