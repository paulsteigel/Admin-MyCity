import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import moment from 'moment';
const {width} = Dimensions.get('window');

const ForwardHistory = props => {
  const data = props.data;
  return (
    <View
      style={{
        alignSelf: 'center',
        width: 0.85 * width - 30,
        paddingBottom: 10,
      }}>
      {data.map(item => (
        <View key={item.id} style={styles.card}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.bold}>{item.userCreateName}</Text>
            <Text style={{color: '#666', fontSize: 12}}>
              {moment(item.updatedAt).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Text style={{color: '#999'}}>Chuyển phản ánh đến:</Text>
          <Text style={styles.bold}>
            {item.departmentUpdateName || item.agencyIdUpdateName}
          </Text>
          <Text style={{marginTop: 10}}>{item.message}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    width: '100%',
    marginTop: 10,
    flex: 1,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  bold: {
    flex: 1,
    opacity: 0.6,
    fontWeight: 'bold',
  },
});
export default ForwardHistory;
