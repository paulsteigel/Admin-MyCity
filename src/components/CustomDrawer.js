import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT} from '../redux/constants';
import Image from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {BASE_URL} from '../service';
const BTN_COLOR = '#df1212';
export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();
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
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/user_avatar.png')}
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
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
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
