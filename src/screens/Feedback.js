import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';
const Feedback = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} />
      <Text>This is Feedback Screen</Text>
    </View>
  );
};
export default Feedback;
