import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch, Button} from 'react-native';
import SubjectPicker from './SubjectPicker';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
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
  const handleSubmit = () => {
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
          Toast.show('Đã ẩn thông tin người gửi phản ánh');
          // dispatch({
          //   type: MARK_REPORTS_OUTDATED,
          //   payload: {isDataOutdated: true},
          // });
        } else Toast.show('Có lỗi xảy ra');
      })
      .catch(err => {
        dispatch({type: OPEN_ERROR_POPUP});
        console.log('err anonymize user', JSON.stringify(err));
      })
      .finally(() => {
        dispatch({type: CLOSE_LOADING_MODAL});
      });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {/*  <Text style={styles.fontSize}>Tiêu đề</Text>
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
          */}
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              flexDirection: 'row',
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                flex: 1,
              }}>
              Ẩn thông tin người gửi phản ánh
            </Text>
            <Switch
              onValueChange={() =>
                setReport({...report, isHide: !report.isHide})
              }
              value={report.isHide}
            />
          </View>
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
        <Button title="Ẩn" color="green" onPress={handleSubmit} />
      </View>
    </>
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
