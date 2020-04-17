import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{justifyContent: 'center', height: 300, alignItems: 'center'}}>
        <Text>UserInfo</Text>
        <TouchableOpacity onPress={() => dispatch({type: 'LOGOUT'})}>
          <Icon name="log-out" size={25} />
          <Text>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
