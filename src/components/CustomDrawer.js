import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT} from '../redux/constants';
import Image from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
const BTN_COLOR = '#df1212';
export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch({type: LOGOUT});
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
          <Text style={styles.userInfo}>{user.name}</Text>
          <Text style={styles.userInfo}>{user.email}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={{color: BTN_COLOR}}>ĐĂNG XUẤT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  imageContainer: {flex: 1},
  userInfo: {
    marginLeft: 18,
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
