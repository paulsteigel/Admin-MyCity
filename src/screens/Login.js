import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const login = async () => {
    let user = {name: 'alice bob'};
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigation.navigate('dashboard');
  };
  return (
    <View>
      <Text> login </Text>
      <Button title="login" onPress={login} />
    </View>
  );
};
export default Login;
