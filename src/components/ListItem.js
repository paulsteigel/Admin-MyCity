import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {BASE_URL} from '../service';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');
import moment from 'moment';
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
  const {report, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.title}>{truncate(report.title, 10)}</Text>
          <Text style={styles.category}>Lĩnh vực: {report.subjectName}</Text>
        </View>
        <View>
          <Text style={styles.maincontent}>{truncate(report.content, 20)}</Text>
        </View>
        <View style={styles.cardDescription}>
          <Text style={styles.time}>Trạng thái: {report.status} </Text>
          <Text style={styles.time}>{moment(report.createdAt).fromNow()}</Text>
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
