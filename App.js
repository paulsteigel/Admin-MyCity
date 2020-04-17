/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {createStore} from 'redux';
import reducers from './src/redux/reducer';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import Feedback from './src/screens/Feedback';
import CustomDrawerContent from './src/components/CustomDrawerContent';

let store = createStore(reducers);
const Drawer = createDrawerNavigator();

const Secured = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Feedback" component={Feedback} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const token = useSelector(state => state.token);
  console.log(token);
  return token === '' ? <Login /> : <Secured />;
};

export default App;
