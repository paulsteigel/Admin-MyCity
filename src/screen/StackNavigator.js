import React, {useEffect} from 'react';
import DetailReport from './DetailReport';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import Dashboard from './Dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HandleReport from './HandleReport';
import RecivedReports from './RecivedReports';
import CustomDrawerContent from '../components/CustomDrawer';
import '../service/NotifiService';
import NotificationGroup from './NotificationGroup';
import BroadCastNotify from './BroadCastNotify';
import {GET_SUBJECTS, PUT_NOTIFICATION_GROUP} from '../redux/constants';
import SimpleToast from 'react-native-simple-toast';
import Axios from 'axios';
import {BASE_URL} from '../service';
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const screens = [
  {
    permissLevel: 3,
    component: Dashboard,
    name: 'dashboard',
    options: {title: 'Phản ánh chưa chuyển'},
  },
  {
    permissLevel: 4,
    component: RecivedReports,
    name: 'phan_anh_tiep_nhan',
    options: {title: 'Danh sách phản ánh tiếp nhận'},
  },
  {
    permissLevel: 5,
    component: HandleReport,
    name: 'phan_anh_xu_ly',
    options: {title: 'Danh sách phản ánh xử lý'},
  },
  {
    permissLevel: 2,
    component: NotificationGroup,
    name: 'notificationGroup',
    options: {title: 'Quản lý nhóm thông báo'},
  },
  {
    permissLevel: 2,
    component: BroadCastNotify,
    name: 'broadcastNotify',
    options: {title: 'Thông báo cộng đồng'},
  },
];

function DrawerNavigator() {
  const {user} = useSelector(state => state.user);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {screens.map(screen => {
        if (screen.permissLevel >= user.groupId)
          return (
            <Drawer.Screen
              component={screen.component}
              options={screen.options}
              name={screen.name}
              key={screen.name}
            />
          );
      })}
    </Drawer.Navigator>
  );
}
export default function StackNavigator() {
  const dispatch = useDispatch();
  const getNotificationGroup = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/admin/notificationGroups`);
      dispatch({
        type: PUT_NOTIFICATION_GROUP,
        payload: res.data.filter(item => item.approved),
      });
    } catch (error) {
      console.log('[App.js] getNotificationGroup', error);
      SimpleToast.show('Có lỗi xảy ra');
    }
  };
  const getSubject = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/subjects`);
      dispatch({type: GET_SUBJECTS, payload: res.data});
    } catch (error) {
      console.log('subject', JSON.stringify(error));
      SimpleToast.show('Có lỗi xảy ra');
    }
  };
  useEffect(() => {
    getSubject();
    getNotificationGroup();
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
