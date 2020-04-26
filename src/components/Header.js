import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const headerHeihgt = 50;
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Icon
        color="#fff"
        name="menu"
        size={headerHeihgt}
        style={styles.menu}
        onPress={() => navigation.openDrawer()}
      />
      <Text style={styles.title}>Tiêu đề </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#491',
    alignItems: 'center',
    // height: headerHeihgt,
  },
  menu: {
    width: headerHeihgt,
    height: headerHeihgt,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});

export default Header;
