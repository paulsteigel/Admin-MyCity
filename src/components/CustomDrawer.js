import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT} from '../redux/constants';
import Image from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {BASE_URL} from '../service';
import Icon from 'react-native-vector-icons/FontAwesome';
const BTN_COLOR = '#df1212';
export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const [isHiddenDropdown, setHiddenDropdown] = useState(true);
  const [currentItem, setCurrentItem] = useState('');
  const {user} = useSelector(state => state.user);
  const logout = () => {
    Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất tài Khoản', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'OK',
        style: 'default',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('user');
            await Axios.post(`${BASE_URL}/usersys/updateToken`, {
              token: '',
              id: user.id,
            });
            console.log('logged out');
          } catch (err) {
            console.log('Logout Err', err);
          }
          dispatch({type: LOGOUT});
        },
      },
    ]);
  };
  const {descriptors} = props;
  const routeNames = props.state.routeNames;
  const drawerItems = Object.keys(descriptors)
    .filter(item => item.includes('phan_anh'))
    .map((item, index) => ({
      name: routeNames[index],
      label: descriptors[item].options.title,
    }));

  const avatar =
    user.avatar === ''
      ? require('../assets/user_avatar.png')
      : {uri: BASE_URL + user.avatar};
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            onError={err => {
              console.log('avatar err');
            }}
            source={avatar}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={{color: BTN_COLOR}}>ĐĂNG XUẤT</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.userInfo}>{user.name}</Text>
          <Text style={styles.userInfo}>{user.email}</Text>
        </View>
      </View>

      <OuterDrawerItem
        label="Phản ánh"
        hideDropdown={isHiddenDropdown}
        onPress={() => setHiddenDropdown(!isHiddenDropdown)}
      />
      <View>
        {drawerItems.map((item, index) => {
          if (!isHiddenDropdown)
            return (
              <DrawerItem
                key={index}
                style={{
                  borderColor: item.name === currentItem ? '#35acdb' : '#eee',
                  borderBottomWidth: 1,
                  marginLeft: 35,
                }}
                labelStyle={{
                  color: item.name === currentItem ? '#35acdb' : '#666',
                }}
                label={item.label}
                onPress={() => {
                  props.navigation.navigate(item.name);
                  setCurrentItem(item.name);
                }}
              />
            );
          return null;
        })}
      </View>
      {user.groupId !== 5 && (
        <DrawerItem
          label="Thông báo"
          labelStyle={{
            color: 'thong_bao' === currentItem ? '#35acdb' : '#666',
          }}
          onPress={() => {
            const name = 'thong_bao';
            setCurrentItem(name);
            setHiddenDropdown(true);
            props.navigation.navigate(name);
          }}
        />
      )}
    </DrawerContentScrollView>
  );
}

const OuterDrawerItem = ({label, hideDropdown, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingTop: 21,
      paddingBottom: 16,
      paddingLeft: 20,
      paddingRight: 10,
    }}>
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{color: '#666', flex: 1}}>{label}</Text>
      <Icon
        color="#999"
        name={hideDropdown ? 'chevron-right' : 'chevron-down'}
        size={16}
      />
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#efefef',
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    marginTop: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BTN_COLOR,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
