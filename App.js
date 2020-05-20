import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './src/screen/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, Alert, BackHandler} from 'react-native';
import Dashboard from './src/screen/Dashboard';
import moment from 'moment';
import localization from 'moment/locale/vi';
import DetailReport from './src/screen/DetailReport';
import RecivedReports from './src/screen/RecivedReports';
import CustomDrawerContent from './src/components/CustomDrawer';
import {LOGIN, GET_SUBJECTS, CLOSE_ERROR_POPUP} from './src/redux/constants';
import Axios from 'axios';
import {BASE_URL} from './src/service';
import Popup from './src/components/Popup';
import LoadingModal from './src/components/LoadingModal';
import LoadingScreen from './src/screen/LoadingScreen';
import ErrorPopup from './src/components/ErrorPopup';
import HandleReport from './src/screen/HandleReport';
moment.updateLocale('vi', localization);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screens = [
  {
    id: 3,
    component: Dashboard,
    name: 'dashboard',
    options: {title: 'Phản ánh chưa chuyển'},
  },
  {
    id: 4,
    component: RecivedReports,
    name: 'phan_anh_tiep_nhan',
    options: {title: 'Danh sách phản ánh tiếp nhận'},
  },
  {
    id: 5,
    component: HandleReport,
    name: 'phan_anh_xu_ly',
    options: {title: 'Danh sách phản ánh xử lý'},
  },
];
function DrawerNavigator() {
  const {user} = useSelector(state => state.user);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {screens.map(screen => {
        if (screen.id >= user.groupId)
          return (
            <Drawer.Screen
              component={screen.component}
              options={screen.options}
              name={screen.name}
              key={screen.id}
            />
          );
      })}
    </Drawer.Navigator>
  );
}

const App = () => {
  const [user, loadingModal] = useSelector(state => {
    return [state.user, state.loadingModal];
  });

  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get(`${BASE_URL}/subjects`)
      .then(res => {
        dispatch({type: GET_SUBJECTS, payload: res.data});
      })
      .catch(err => console.log('subject', JSON.stringify(err)));
  }, []);
  useEffect(() => {
    const backAction = () => {
      return loadingModal.visible;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [loadingModal.visible]);

  if (user.isLoading) return <LoadingScreen />;

  if (!user.user) return <Login />;

  return (
    <NavigationContainer>
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
          name="__drawer__"
          options={{headerShown: false}}
          component={DrawerNavigator}
        />
        <Stack.Screen
          options={{title: 'Chi tiết phản ánh'}}
          name="detailReport"
          component={DetailReport}
        />
      </Stack.Navigator>
      <ErrorPopup />
      <Popup />
      <LoadingModal />
    </NavigationContainer>
  );
};

export default App;
