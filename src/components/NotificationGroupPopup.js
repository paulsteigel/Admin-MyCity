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
const NotificationGroupPopup = props => {
  const {visible, handleClose, refeshFunc, data} = props;

  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      isVisible={visible}
      avoidKeyboard={true}>
      <View style={{...styles.container, maxHeight: height}}>
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
  const [groupName, setGroupName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [sortOrder, setSortOrder] = useState(
    data.sortOrder == undefined ? '' : data.sortOrder + '',
  );
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(data.approved);
  const handleSubmit = async () => {
    if (!validInput()) {
      SimpleToast.show('Dữ liệu không hợp lệ');
      return;
    }
    try {
      const payload = {
        description,
        sortOrder,
        approved,
        name: groupName,
        id: data.id,
      };
      handleClose();
      dispatch({type: OPEN_LOADING_MODAL});
      const res = await Axios.put(
        `${BASE_URL}/admin/notificationGroups/id`,
        payload,
      );
      refeshFunc();
      SimpleToast.show('Đã cập nhật thành công');

      console.log(res.data);
    } catch (error) {
      SimpleToast.show('Có lỗi xảy ra');
      console.log('[update Notification Group] err', error);
    } finally {
      dispatch({type: CLOSE_LOADING_MODAL});
    }
  };
  const validInput = () => {
    if (approved === undefined) setApproved(false);
    if (description === '' || sortOrder === '' || groupName === '')
      return false;
    const notNumber = sortOrder.match(/[^0-9]/g);
    return notNumber === null;
  };
  const createGroup = async () => {
    if (!validInput()) {
      SimpleToast.show('Dữ liệu không hợp lệ');
      return;
    }
    try {
      const payload = {
        description,
        sortOrder,
        approved,
        name: groupName,
      };
      handleClose();
      dispatch({type: OPEN_LOADING_MODAL});
      const res = await Axios.post(
        `${BASE_URL}/admin/notificationGroups`,
        payload,
      );
      refeshFunc();
      SimpleToast.show('Đã tạo nhóm thành công');

      console.log(res.data);
    } catch (error) {
      SimpleToast.show('Có lỗi xảy ra');
      console.log('[create Notification Group] err', error);
    } finally {
      dispatch({type: CLOSE_LOADING_MODAL});
    }
  };
  return (
    <>
      <View style={styles.body}>
        <PopupRow
          onChangeText={setGroupName}
          label="Tên nhóm"
          value={groupName}
          placeholder="Tên nhóm"
        />
        <PopupRow
          onChangeText={setDescription}
          label="Mô tả"
          placeholder="Mô tả"
          value={description}
        />
        <PopupRow
          value={sortOrder}
          onChangeText={setSortOrder}
          label="Sắp xếp"
          placeholder="Sắp xếp"
          keyboardType="numeric"
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
export default NotificationGroupPopup;
