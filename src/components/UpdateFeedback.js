import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Switch, Alert} from 'react-native';
import SubjectPicker from './SubjectPicker';
import {TextInput} from 'react-native-gesture-handler';
import Axios from 'axios';
import {BASE_URL} from '../service';
import {useDispatch} from 'react-redux';
import {
  CLOSE_POPUP,
  MARK_REPORTS_OUTDATED,
  OPEN_ERROR_POPUP,
  OPEN_LOADING_MODAL,
  CLOSE_LOADING_MODAL,
} from '../redux/constants';
import Toast from 'react-native-simple-toast';

const UpdateFeedback = ({item, isSubmit, setIsSubmit}) => {
  const [report, setReport] = useState(item);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isSubmit) return;
    dispatch({type: CLOSE_POPUP});
    dispatch({type: OPEN_LOADING_MODAL});
    Axios.post(`${BASE_URL}/admin/feedbacks/update/${report.id}`, {
      title: report.title,
      subId: report.subId,
      content: report.content,
      isPublic: report.isPublic,
      isHide: report.isHide,
    })
      .then(res => {
        if (res.status == 200) {
          Toast.show('Cập nhật phản ánh thành công');
          dispatch({
            type: MARK_REPORTS_OUTDATED,
            payload: {isDataOutdated: true},
          });
        } else Alert.alert('Lỗi', 'Cập nhật phản ánh thất bại');
        setIsSubmit(false);
      })
      .catch(err => {
        dispatch({type: OPEN_ERROR_POPUP});
        console.log('err update feedback', JSON.stringify(err));
      })
      .finally(() => {
        dispatch({type: CLOSE_LOADING_MODAL});
      });
  }, [isSubmit]);
  return (
    <View style={styles.container}>
      <Text style={styles.fontSize}>Tiêu đề</Text>
      <TextInput
        style={styles.textInput}
        value={report.title}
        onChangeText={title => setReport({...report, title})}
      />
      <Text style={styles.fontSize}>Lĩnh vực</Text>
      <SubjectPicker
        onValueChange={subId => {
          setReport({...report, subId});
        }}
        selectedValue={report.subId}
      />
      <Text style={styles.fontSize}>Nội dung</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.textInput}
        value={report.content}
        onChangeText={content => setReport({...report, content})}
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Switch
          onValueChange={() =>
            setReport({...report, isPublic: !report.isPublic})
          }
          value={report.isPublic}
        />
        <Text
          style={{
            textAlignVertical: 'center',
          }}>
          Công khai phản ánh
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Switch
          onValueChange={() => setReport({...report, isHide: !report.isHide})}
          value={report.isHide}
        />
        <Text
          style={{
            textAlignVertical: 'center',
          }}>
          Ẩn thông tin người gửi
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  textInput: {
    borderColor: '#eee',
    borderWidth: 1,
    textAlignVertical: 'center',
    padding: 5,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
  },
});
export default UpdateFeedback;
