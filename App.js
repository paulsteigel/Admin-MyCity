import React, {useEffect, useRef, useState} from 'react';
import Login from './src/screen/Login';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {BackHandler} from 'react-native';
import moment from 'moment';
import localization from 'moment/locale/vi';
import {GET_SUBJECTS} from './src/redux/constants';
import Axios from 'axios';
import {BASE_URL} from './src/service';
import Popup from './src/components/Popup';
import LoadingModal from './src/components/LoadingModal';
import LoadingScreen from './src/screen/LoadingScreen';
import ErrorPopup from './src/components/ErrorPopup';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './src/screen/Dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HandleReport from './src/screen/HandleReport';
import DetailReport from './src/screen/DetailReport';
import RecivedReports from './src/screen/RecivedReports';
import CustomDrawerContent from './src/components/CustomDrawer';
import {navigationRef} from './src/service/NotifiService';
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
  const dispatch = useDispatch();

  const [user, loadingModal] = useSelector(state => {
    return [state.user, state.loadingModal];
  });

  const getSubject = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/subjects`);
      dispatch({type: GET_SUBJECTS, payload: res.data});
    } catch (error) {
      console.log('subject', JSON.stringify(error));
    }
  };

  const preventBackButtonWhileLoading = () => {
    const backAction = () => {
      return loadingModal.visible;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  };
  useEffect(() => {
    getSubject();
  }, []);
  useEffect(preventBackButtonWhileLoading, [loadingModal.visible]);

  if (user.isLoading) return <LoadingScreen />;

  if (!user.user) return <Login />;

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
      <ErrorPopup />
      <Popup />
      <LoadingModal />
    </NavigationContainer>
  );
};
function StackNavigator() {
  const [isMoundted, setMounted] = useState(false);
  const dispatch = useDispatch();
  useState(() => {
    dispatch({type: 'MOUNTED'});
  }, []);
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
      }}
      initialRouteName="__drawer__">
      <Stack.Screen
        options={{title: 'Chi tiết phản ánh'}}
        name="detailReport"
        component={DetailReport}
      />
      <Stack.Screen
        name="__drawer__"
        options={{headerShown: false}}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
}
export default App;
