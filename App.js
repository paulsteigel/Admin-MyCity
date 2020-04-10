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
import {View, Text} from 'react-native';
import Dashboard from './src/screens/Dashboard';
import AsyncStorage from '@react-native-community/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
function Temp(params) {
  const render = [1, 2, 2, 3, 3, 33, 2, 22, 2, 2].map((item, index) => (
    <Tab.Screen key={index} name={'tab' + index} component={Tab2} />
  ));
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        activeTintColor: 'lightgreen',
        inactiveTintColor: 'grey',
      }}>
      <Tab.Screen name="taba" component={Tab1} />
      {render}
      {/* <Tab.Screen name="tab1" component={Tab1} />
      <Tab.Screen name="tab2" component={Tab2} />
      <Tab.Screen name="tab5" component={Tab2} /> */}
    </Tab.Navigator>
  );
}
function Tab1(params) {
  return (
    <View>
      <Text>Tab 1</Text>
    </View>
  );
}
class Tab2 extends React.Component {
  static count = 1;
  render() {
    Tab2.count++;
    return (
      <View>
        <Text>Tab {Tab2.count++}</Text>
      </View>
    );
  }
}
function Tab3(params) {
  return (
    <View>
      <Text>Tab 2</Text>
    </View>
  );
}
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
        <Stack.Screen
          options={{header: () => null}}
          name="dashboard"
          component={Temp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
