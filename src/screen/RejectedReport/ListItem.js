import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {useSelector} from 'react-redux';
function truncate(str, displayWords) {
  // if (!str) {
  //   console.log('rnoe');

  //   return '';
  // }
  let result = str;
  result = str.trim().split(' ');
  if (result.length > displayWords) {
    result = result.splice(0, displayWords);
    return result.join(' ') + '...';
  }
  return result.join(' ');
}
export default function ListItem(props) {
  const {user} = useSelector(state => state.user);
  const {report, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.title}>{truncate(report.title, 10)}</Text>
          <Text style={styles.category}>
            Đơn vị trả lại: {report.handlerName}
          </Text>
        </View>
        <View>
          <Text style={styles.maincontent}>Lý do: {report.message}</Text>
        </View>
        <View style={styles.cardDescription}>
          <View>
            <Text style={styles.time}>Hạn xử lý</Text>
            <Text style={styles.time}>
              {moment(report.dateExpire).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View>
            <Text style={styles.time}>Ngày trả lại</Text>
            <Text style={styles.time}>
              {moment(report.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  maincontent: {
    color: '#444',
  },
  cardDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: 'gray',
    // shadowRadius: {width: 2, height: 2},
    elevation: 2,
    borderRadius: 10,
  },

  time: {fontSize: 12, color: '#999'},
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    paddingBottom: 0,
    lineHeight: 17,
    // backgroundColor: 'red',
  },
  category: {
    fontSize: 13,
    opacity: 0.6,
  },
});
