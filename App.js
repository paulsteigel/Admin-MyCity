import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './src/screen/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import Dashboard from './src/screen/Dashboard';
import moment from 'moment';
import localization from 'moment/locale/vi';
import DetailReport from './src/screen/DetailReport';
import {LOGIN} from './src/redux/constants';
import AsyncStorage from '@react-native-community/async-storage';
moment.updateLocale('vi', localization);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function Dummy() {
  return (
    <View>
      <Text>Duymy</Text>
    </View>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#018037',
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        options={{title: 'Phản ánh chưa chuyển tiếp'}}
        name="drawerNav"
        component={DawerNavigator}
      />
      <Stack.Screen
        options={{title: 'Chi tiết phản ánh'}}
        name="detailReport"
        component={DetailReport}
      />
    </Stack.Navigator>
  );
}

function DawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen component={Dashboard} name="dashboard" />
    </Drawer.Navigator>
  );
}

const App = () => {
  const user = useSelector(state => state.user);

  if (!user) return <Login />;

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
