import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  MenuOptions,
  MenuTrigger,
  Menu,
  MenuOption,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const litmitStr = str => {
  try {
    const numberOfWords = 20;
    const res = str.split(' ');
    if (res.length < numberOfWords) return res.join(' ');
    return res.slice(0, numberOfWords - 1).join(' ') + '...';
  } catch (error) {
    return '';
  }
};

export default function HandledCard({
  viewForwardHistory,
  handleable,
  handleReport,
  onPress,
  ...props
}) {
  const {message, dateExpired, dateCreate} = props.item;
  const title = props.item.feedback.title;
  return (
    <View style={styles.Item}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.title}>Tiêu đề: {title}</Text>
        <Text style={styles.message}>Ghi chú: {litmitStr(message)}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.time}>
          Hạn xử lý: {moment(dateExpired).format('DD/MM/YYYY')}
        </Text>
        <Text style={styles.time}>
          Ngày xử lý: {moment(dateCreate).format('DD/MM/YYYY')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 7,
  },
  time: {
    // opacity: 0.4,
    color: '#999',
    fontSize: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    opacity: 0.7,
    paddingVertical: 5,
  },
  button: {
    justifyContent: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 13,
    // backgroundColor: 'red',
  },
});
