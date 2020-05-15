import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function ForwardComponent(props) {
  const navigation = useNavigation();

  const {
    feedbackId,
    status,
    title,
    dateCreate,
    dateExpired,
    message,
    handlerName,
  } = props.item;
  const getStatusColor = () => {
    const diffTime = moment(dateExpired).diff(new Date(), 'days');
    return status === 4
      ? 'lightgreen'
      : diffTime > 0
      ? '#71755d'
      : diffTime === 0
      ? '#ebd617'
      : '#d92316';
  };
  const handleStatus = () => {
    const diffTime = moment(dateExpired).diff(new Date(), 'days');
    if (status === 4) return 'Đã phản hồi';
    return diffTime >= 0
      ? `Còn lại ${diffTime} ngày`
      : `Quá hạn ${diffTime} ngày`;
  };
  const handleNavigate = () => {
    navigation.navigate('detailReport', feedbackId);
  };
  return (
    <View style={styles.Item}>
      <TouchableOpacity onPress={handleNavigate}>
        <Text style={styles.title}>Tiêu đề: {title}</Text>
        <Text style={styles.message}>Ghi chú: {message}</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.time}>
            Ngày gửi: {moment(dateCreate).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.time}>Đơn vị xử lý: {handlerName}</Text>
        </View>
        <View style={{width: 8}} />
        <Text
          style={{
            fontSize: 12,
            color: getStatusColor(),
            textAlignVertical: 'bottom',
          }}>
          {handleStatus()}
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
    color: '#999',
    fontSize: 12,
    flex: 1,
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
  },
});
