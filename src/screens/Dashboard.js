import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';

const Dashboard = ({navigation}) => {
  const [user, setUser] = useState({name: ''});
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      setUser(JSON.parse(user));
    });
  }, []);
  return (
    <View>
      <Header navigation={navigation} />
      <Text> hello {user.name}</Text>
    </View>
  );
};
export default Dashboard;
