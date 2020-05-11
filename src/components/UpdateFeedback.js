import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Picker, Switch} from 'react-native';
import Row from './PopupRow';
import SubjectPicker from './SubjectPicker';
import {TextInput} from 'react-native-gesture-handler';
import Axios from 'axios';
import {BASE_URL} from '../service';

const UpdateFeedback = ({id}) => {
  const [feedback, setFeedback] = useState(null);
  useEffect(() => {
    Axios.get(`${BASE_URL}/admin/feedbacks/${id}`).then(res => {
      setFeedback(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.fontSize}>Tiêu đề</Text>
      <TextInput style={styles.textInput} value={feedback.title} />
      <Text style={styles.fontSize}>Lĩnh vực</Text>
      <SubjectPicker />
      <Text style={styles.fontSize} value={feedback.content}>
        Nội dung
      </Text>
      <TextInput multiline numberOfLines={4} style={styles.textInput} />
      <Text style={styles.fontSize}>Công khai phản ánh</Text>
      <Switch
        onValueChange={() =>
          setFeedback({...feedback, isPublic: !feedback.isPublic})
        }
        value={feedback.isPublic}
      />
      <Text style={styles.fontSize}>Ẩn thông tin người gửi</Text>
      <Switch
        onValueChange={() =>
          setFeedback({...feedback, isHide: !feedback.isHide})
        }
        value={feedback.isHide}
      />
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
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
  },
});
export default UpdateFeedback;
