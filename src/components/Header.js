import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Header = ({navigation}) => {
  return (
    <View style={style.wrapper}>
      <Icon
        name="menu"
        size={35}
        onPress={() => navigation.toggleDrawer()}
        style={style.icon}
      />
      <Text style={style.title}>Phan Anh</Text>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  icon: {
    width: 35,
    backgroundColor: 'green',
    alignSelf: 'flex-start',
  },
  title: {
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});

export default Header;
