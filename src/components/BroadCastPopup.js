import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupRow from './PopupRow';
import Axios from 'axios';
import {BASE_URL} from '../service';
import {Switch} from 'react-native-gesture-handler';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL} from '../redux/constants';

const {width, height} = Dimensions.get('window');
const BroadCastPopup = props => {
  const {visible, handleClose, refeshFunc, data} = props;

  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      isVisible={visible}
      avoidKeyboard={true}>
      <View style={{...styles.container, maxHeight: height * 0.8}}>
        <View style={styles.closeModalBtn}>
          <Icon name="close" onPress={handleClose} size={18} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.popupTitle}</Text>
        </View>
        {visible ? (
          <BodyArea
            refeshFunc={refeshFunc}
            handleClose={handleClose}
            data={data}
          />
        ) : null}
      </View>
    </Modal>
  );
};
function BodyArea({data, refeshFunc, handleClose}) {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [content, setContent] = useState(data.content);
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(data.approved || false);
  const handleSubmit = async () => {
    if (!validInput()) {
      SimpleToast.show('Dữ liệu không hợp lệ');
      return;
    }
    try {
      const payload = {
        description,
        content,
        approved,
        title,
      };
      handleClose();
      dispatch({type: OPEN_LOADING_MODAL});
      const res = await Axios.post(
        `${BASE_URL}/admin/notifications/update/${data.id}`,
        payload,
      );
      refeshFunc();
      SimpleToast.show('Đã cập nhật thành công');
    } catch (error) {
      SimpleToast.show('Có lỗi xảy ra');
      console.log('[update Notification Group] err', error);
    } finally {
      dispatch({type: CLOSE_LOADING_MODAL});
    }
  };
  const validInput = () => {
    if (description === '' || content === '' || title === '') return false;
    return true;
  };

  // const createGroup = async () => {
  //   if (!validInput()) {
  //     SimpleToast.show('Dữ liệu không hợp lệ');
  //     return;
  //   }
  //   try {
  //     const payload = {
  //       description,
  //       content,
  //       approved,
  //       title,
  //     };
  //     handleClose();
  //     dispatch({type: OPEN_LOADING_MODAL});
  //     const res = await Axios.post(
  //       `${BASE_URL}/admin/notificationGroups`,
  //       payload,
  //     );
  //     refeshFunc();
  //     SimpleToast.show('Đã tạo nhóm thành công');

  //     console.log(res.data);
  //   } catch (error) {
  //     SimpleToast.show('Có lỗi xảy ra');
  //     console.log('[create Notification Group] err', error);
  //   } finally {
  //     dispatch({type: CLOSE_LOADING_MODAL});
  //   }
  // };
  return (
    <>
      <View style={styles.body}>
        <PopupRow
          onChangeText={setTitle}
          label="Tiêu đề"
          value={title}
          placeholder="Tiêu đề"
        />
        <PopupRow
          onChangeText={setDescription}
          label="Mô tả"
          placeholder="Mô tả"
          value={description}
        />
        <PopupRow
          value={content}
          onChangeText={setContent}
          label="Nội dung"
          placeholder="Nội dung"
          multiline
        />
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 15,
            flexDirection: 'row',
            paddingTop: 10,
          }}>
          <Text>Trạng thái</Text>
          <Switch
            style={{paddingLeft: 20}}
            value={approved}
            onValueChange={setApproved}
          />
        </View>
      </View>
      <View style={{padding: 15, paddingBottom: 20}}>
        {data.popupTitle === 'Cập nhật' ? (
          <Button onPress={handleSubmit} title="cập nhật" />
        ) : (
          <Button onPress={createGroup} title="Tạo nhóm" />
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  textInput: {
    borderColor: '#333',
    borderWidth: 1,
    flex: 3,
  },
  label: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderColor: 'lightgreen',
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    borderColor: 'lightgreen',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  body: {
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 5,
  },
  closeModalBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -10,
    top: -10,
  },
});
export default BroadCastPopup;
