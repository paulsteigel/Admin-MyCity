import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {BASE_URL} from '../services';
import {TouchableOpacity} from 'react-native-gesture-handler';
const handleStatus = [
  'Khởi tạo',
  'Chuyển xử lý',
  'Phân công xử lý',
  'Đang xử lý',
  'Hoàn thành',
];

export default class ListItem extends PureComponent {
  render() {
    const {report, onPress} = this.props;
    let source;
    if (report.image.length > 0)
      source = {uri: `${BASE_URL}/images/${report.image[0]}`};
    else source = require('../assets/fallback_img.jpg');
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image style={styles.image} source={source} />
        <View
          style={{
            flex: 1,
            borderLeftWidth: 1,
            borderLeftColor: '#aaa',
            justifyContent: 'space-between',
          }}>
          <Text style={{paddingHorizontal: 5}}>{report.title}</Text>

          <View style={{paddingHorizontal: 5}}>
            <Text style={styles.text}>Lĩnh vực: {report.sub_area}</Text>
            <Text style={styles.text}>
              Trạng thái: {handleStatus[report.status]}
            </Text>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.text}>{formatTime(report.createdAt)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: 'gray',
    elevation: 2,
    borderRadius: 5,
  },
  image: {
    width: 165,
    height: 130,
  },
  text: {fontSize: 13, color: '#999'},
});
function formatTime(time) {
  let hour = parseInt(time.substr(11, 2), 10);
  let subfix = hour < 12 ? ' AM' : ' PM';
  let day = time
    .substr(0, 10)
    .split('-')
    .reverse()
    .join('-');
  return day + ' ' + time.substr(11, 5) + subfix;
}
