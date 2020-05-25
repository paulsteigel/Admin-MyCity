import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import PopupRow from './PopupRow';
import Axios from 'axios';
import {BASE_URL} from '../service';
import {Switch, ScrollView} from 'react-native-gesture-handler';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL} from '../redux/constants';

const {width, height} = Dimensions.get('window');
const SendNotificationGroupPopup = props => {
  const {visible, handleClose, refeshFunc, data} = props;
  const notificationGroup = useSelector(state => state.notifyGroup);
  const [trackingArr, setTrackArr] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const _arr = notificationGroup.map(item => ({
      id: item.id,
      name: item.name,
      selected: false,
    }));
    setTrackArr(_arr);
  }, [notificationGroup]);
  const handleValueChange = (value, index) => {
    const _arr = trackingArr.map((i, id) => {
      if (id === index) return {...i, selected: value};
      return i;
    });
    setTrackArr(_arr);
  };
  const handleSubmit = async () => {
    try {
      handleClose();
      dispatch({type: OPEN_LOADING_MODAL});
      const url = `${BASE_URL}/admin/notifications/${data.id}`;
      const groupIds = [];
      trackingArr.forEach(el => {
        if (el.selected) groupIds.push(el.id);
      });
      const res = await Axios.post(url, {groupIds});
      console.log('res status', res.status);
    } catch (error) {
      SimpleToast.show('Có lỗi xảy ra');
      console.log(JSON.stringify(error));
    } finally {
      dispatch({type: CLOSE_LOADING_MODAL});
    }
  };
  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      isVisible={visible}
      avoidKeyboard={true}>
      <View style={{...styles.container, maxHeight: height * 0.7}}>
        <View style={styles.closeModalBtn}>
          <Icon name="close" onPress={handleClose} size={18} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Gửi thông báo đến các nhóm</Text>
        </View>
        <ScrollView style={{paddingHorizontal: 15}}>
          {trackingArr.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text>{item.name}</Text>
              <Switch
                value={item.selected}
                onValueChange={value => handleValueChange(value, index)}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="Gửi" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderColor: '#ccc',
    borderBottomWidth: 1,
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
export default SendNotificationGroupPopup;
