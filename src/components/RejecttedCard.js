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
export default function ReportComponent(props) {
  const {feedbackId, title, message, id, dateExpired, dateCreate} = props.item;
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('detailReport', {id: feedbackId, hideHeaderBtn: true});
  };
  return (
    <View style={styles.Item}>
      <TouchableOpacity onPress={handleNavigate}>
        <Text style={styles.title}>Tiêu đề: {title}</Text>
        <Text style={styles.message}>Ghi chú: {message}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.time}>
            Ngày gửi: {moment(dateCreate).format('DD/MM/YYYY')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.time}>Hạn xử lý: </Text>
            <Text
              style={{
                ...styles.time,
                color:
                  moment(dateExpired).diff(new Date(), 'days') < 0
                    ? '#de6a6a'
                    : '#000',
              }}>
              {moment(dateExpired).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <Menu>
          <MenuTrigger
            customStyles={{TriggerTouchableComponent: TouchableOpacity}}>
            <Icon name="dots-vertical" size={25} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              style={styles.button}
              text="Chuyển phản ánh"
              onSelect={() => props.forwarding(id)}
            />
            <MenuOption style={styles.button}>
              <Text>Lịch sử chuyển</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
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
