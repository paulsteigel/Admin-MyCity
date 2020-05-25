import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import Axios from 'axios';
import {BASE_URL} from '../service';
import Icon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import NotificationGroupPopup from '../components/NotificationGroupPopup';
import {useDispatch, useSelector} from 'react-redux';
import {
  OPEN_LOADING_MODAL,
  CLOSE_LOADING_MODAL,
  PUT_NOTIFICATION_GROUP,
} from '../redux/constants';
import SimpleToast from 'react-native-simple-toast';
const NotificationGroup = ({navigation}) => {
  const data = useSelector(state => state.notifyGroup);
  const [dataPopup, setDataPopup] = useState({});
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isRefesh, setRefesh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getNotificationGroup();
  }, []);
  const handleRefesh = () => {
    setRefesh(true);
    getNotificationGroup();
  };
  const getNotificationGroup = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/admin/notificationGroups`);
      dispatch({
        type: PUT_NOTIFICATION_GROUP,
        payload: res.data.filter(item => item.approved),
      });
    } catch (error) {
      console.log(error);
      SimpleToast.show('Có lỗi xảy ra');
    } finally {
      setRefesh(false);
    }
  };
  const handleEdit = item => {
    setDataPopup({...item, popupTitle: 'Cập nhật'});
    setOpenPopup(true);
  };
  const handleDelete = item => {
    Alert.alert('Xoá nhóm thông báo', `Xóa nhóm ${item.name}?`, [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xoá',
        style: 'default',
        onPress: async () => {
          try {
            dispatch({type: OPEN_LOADING_MODAL});
            const res = await Axios.post(
              `${BASE_URL}/admin/notificationGroups/delete/${item.id}`,
            );
            getNotificationGroup();
            if (res.status === 200) SimpleToast.show('Đã xóa nhóm thông báo');
          } catch (err) {
            SimpleToast.show('Có lỗi xảy ra');
            console.log('Logout Err', err);
          } finally {
            dispatch({type: CLOSE_LOADING_MODAL});
          }
        },
      },
    ]);
  };
  const createNotificationGroup = () => {
    setOpenPopup(true);
    setDataPopup({popupTitle: 'Tạo nhóm thông báo'});
  };
  const closePopup = () => {
    setOpenPopup(false);
  };
  return (
    <View>
      <View style={styles.headerContainer}>
        <MenuIcon
          style={{color: '#fff', paddingLeft: 20}}
          onPress={() => navigation.toggleDrawer()}
          size={30}
          name="menu"
        />
        <View style={{flex: 1}}>
          <Text style={styles.headerText}>Danh mục nhóm thông báo</Text>
        </View>
        <TouchableOpacity
          onPress={createNotificationGroup}
          containerStyle={{
            borderRadius: 10,
            width: 50,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1aa5db',
            elevation: 2,
            marginRight: 5,
          }}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          onRefresh={handleRefesh}
          refreshing={isRefesh}
          data={data}
          keyExtractor={(item, index) => index + ''}
          renderItem={({item}) => (
            <SectionListItem
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              data={item}
            />
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <NotificationGroupPopup
        data={dataPopup}
        handleClose={closePopup}
        visible={isOpenPopup}
        refeshFunc={getNotificationGroup}
      />
    </View>
  );
};
function SectionListItem(props) {
  const {data, handleDelete, handleEdit} = props;
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          handleEdit(data);
        }}
        containerStyle={styles.itemInfo}>
        <View style={{flex: 1}}>
          <Text>Tên danh mục: {data.name}</Text>
          <Text>Mô tả: {data.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.smallText}>
              Thứ tự sắp sếp: {data.sortOrder}
            </Text>
            <Text style={styles.smallText}>
              {moment(data.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleDelete(data);
        }}
        containerStyle={styles.iconContainer}>
        <Icon size={30} color="#fff" name="delete" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 5,
    height: Dimensions.get('window').height - 100,
  },
  itemInfo: {
    padding: 10,
    flex: 1,
  },
  smallText: {
    color: '#666',
    fontSize: 13,
  },
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#018037',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 5,
    borderColor: 'lightgreen',
  },
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
});
export default NotificationGroup;
