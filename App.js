/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const App = () => {
  const [initialRoute, setInitialRoute] = useState('login');
  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user !== null) setInitialRoute('dashboard');
    });
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
