import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './src/screen/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, Button} from 'react-native';
import Dashboard from './src/screen/Dashboard';
import moment from 'moment';
import localization from 'moment/locale/vi';
import DetailReport from './src/screen/DetailReport';
import RecivedReports from './src/screen/RecivedReports';
import CustomDrawerContent from './src/components/CustomDrawer';
import {LOGIN, GET_SUBJECTS} from './src/redux/constants';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from './src/service';
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
        component={Dashboard}
        name="dashboard"
        options={{title: 'Phản ánh chưa chuyển'}}
      />
      <Stack.Screen
        options={{title: 'Chi tiết phản ánh'}}
        name="detailReport"
        component={DetailReport}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen component={StackNavigator} name="stack" />
      <Drawer.Screen component={RecivedReports} name="tabbar" />
    </Drawer.Navigator>
  );
}

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get(`${BASE_URL}/subjects`)
      .then(res => {
        dispatch({type: GET_SUBJECTS, payload: res.data});
      })
      .catch(err => console.log('subject', JSON.stringify(err)));
  }, []);

  if (!user) return <Login />;

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#018037',
    height: 40,
    // width,
    // padding: 0,
    // zIndex: 1000,
  },
  container: {
    padding: 0,
    // zIndex: 100000,
    // backgroundColor: 'red',
  },
});
export default App;
