import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import Axios from 'axios';
import {BASE_URL} from '../service';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL} from '../redux/constants';
import SimpleToast from 'react-native-simple-toast';
import BroadCastPopup from '../components/BroadCastPopup';
import SendNotificationGroupPopup from '../components/SendNotificationPopup';
const BroadCastNotifi = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataPopup, setDataPopup] = useState({});
  const [isOpenPopup, setOpenPopup] = useState(false);
  const [isRefesh, setRefesh] = useState(false);
  const [sendNotifyPopup, setSendNotifyPopup] = useState(false);
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
      const res = await Axios.get(`${BASE_URL}/admin/notifications`);
      setData(res.data);
      console.log('Thong bao cong dong', res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefesh(false);
    }
  };
  const handleEdit = item => {
    setDataPopup({...item, popupTitle: 'Cập nhật'});
    setOpenPopup(true);
  };
  const handleDelete = item => {
    Alert.alert('Xoá thông báo', `Xóa ${item.title}?`, [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xoá',
        style: 'default',
        onPress: async () => {
          try {
            dispatch({type: OPEN_LOADING_MODAL});
            const res = await Axios.delete(
              `${BASE_URL}/admin/notificationGroups/${item.id}`,
            );
            getNotificationGroup();
            SimpleToast.show('Đã xóa nhóm thông báo');
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
  const sendNoitfy = async data => {
    setDataPopup(data);
    setSendNotifyPopup(true);
    console.log('send notify', data.title);
  };
  return (
    <View>
      <View style={styles.headerContainer}>
        <MaterialIcons
          style={{color: '#fff', paddingLeft: 20}}
          onPress={() => navigation.toggleDrawer()}
          size={30}
          name="menu"
        />
        <View style={{flex: 1}}>
          <Text style={styles.headerText}>Thông báo cộng đồng</Text>
        </View>
        {/* <TouchableOpacity
          onPress={createNotificationGroup}
          containerStyle={styles.createButton}>
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity> */}
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
              sendNoitfy={sendNoitfy}
              data={item}
            />
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.center}>
              <Text>Chưa có thông báo nào</Text>
            </View>
          )}
        />
      </View>
      <BroadCastPopup
        handleClose={closePopup}
        visible={isOpenPopup}
        refeshFunc={getNotificationGroup}
        data={dataPopup}
      />
      <SendNotificationGroupPopup
        handleClose={() => setSendNotifyPopup(false)}
        visible={sendNotifyPopup}
        data={dataPopup}
      />
    </View>
  );
};
function SectionListItem(props) {
  const {data, handleDelete, sendNoitfy, handleEdit} = props;
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => handleEdit(data)}
        containerStyle={styles.itemInfo}>
        <View style={{flex: 1}}>
          <Text>Tiêu đề: {data.title}</Text>
          <Text style={{color: '#444', fontSize: 13}}>
            Mô tả: {data.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            {data.approved ? (
              <Text style={styles.display}>Hiển thị</Text>
            ) : (
              <Text style={styles.notDisplay}>Không hiển thị</Text>
            )}
            <Text
              style={{
                ...styles.smallText,
                color: moment(data.expriedDate).isBefore(new Date(), 'day')
                  ? 'red'
                  : 'grey',
              }}>
              {moment(data.expriedDate).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          containerStyle={{...styles.iconStyle, backgroundColor: 'red'}}
          onPress={() => handleDelete(data)}>
          <Icon size={30} color="#fff" name="delete" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendNoitfy(data)}
          containerStyle={{...styles.iconStyle, backgroundColor: '#519af5'}}>
          <MaterialIcons name="send" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notDisplay: {
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 5,
    backgroundColor: '#e84943',
  },
  display: {
    borderRadius: 5,
    paddingHorizontal: 5,
    color: '#fff',
    backgroundColor: '#71ba51',
  },
  iconStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  createButton: {
    borderRadius: 10,
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1aa5db',
    elevation: 2,
    marginRight: 5,
  },
  container: {
    paddingTop: 5,
    paddingHorizontal: 5,
    // flex: 1,
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
    justifyContent: 'space-between',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default BroadCastNotifi;
