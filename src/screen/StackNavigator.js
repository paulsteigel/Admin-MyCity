import React, {useEffect} from 'react';
import DetailReport from './DetailReport';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
// import Dashboard from './Dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HandledReport from './HandledReport';
import RecivedReports from './ReceivedReport';
import CustomDrawerContent from '../components/CustomDrawer';
import PushNotificationService from '../service/NotifiService';
// import ReturnedReport from '../screen/ReturnedReport';
import BroadCastNotify from './BroadCastNotify';
import {GET_SUBJECTS, PUT_NOTIFICATION_GROUP} from '../redux/constants';
import SimpleToast from 'react-native-simple-toast';
import Axios from 'axios';
import {BASE_URL} from '../service';
import VerifiedReport from './VerifiedReport';
import ForwardedReport from './ForwardedReport';
import RejectedReport from './RejectedReport';
import AgencyExipredReport from './AgencyExipredReport';
import DepartmentExpiredReport from './DepartmentExpiredReport';
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const screens = [
  {
    // Màn hình 1
    component: RecivedReports,
    name: 'phan_anh_tiep_nhan',
    options: {title: 'Tiếp nhận'},
  },
  {
    component: VerifiedReport,
    name: 'phan_anh_xac_minh',
    options: {title: 'Đã xác minh'},
  },
  {
    component: ForwardedReport,
    name: 'phan_anh_chuyen_xu_ly',
    options: {title: 'Chuyển xử lý'},
  },
  {
    component: RejectedReport,
    name: 'phan_anh_tra_lai',
    options: {title: 'Trả lại'},
  },
  {
    component: AgencyExipredReport,
    name: 'phan_anh_cham_chuyen_tiep',
    options: {title: 'Chậm chuyển tiếp'},
  },
  {
    component: DepartmentExpiredReport,
    name: 'phan_anh_qua_han',
    options: {title: 'Quá hạn'},
  },
  // {
  //   component: Dashboard,
  //   name: 'dashboard',
  //   options: {title: 'Phản ánh chưa chuyển'},
  // },

  {
    component: HandledReport,
    name: 'phan_anh_da_xu_ly',
    options: {title: 'Đã xử lý'},
  },
  // {
  //   component: ReturnedReport,
  //   name: 'returnedReport',
  //   options: {title: 'Trả lại'},
  // },
  {
    component: BroadCastNotify,
    name: 'thong_bao',
    options: {title: 'Thông báo'},
  },
];

function DrawerNavigator() {
  let hiddenScreens = [];
  const {user} = useSelector(state => state.user);
  if (user.agencyId != 1) {
    hiddenScreens.push('phan_anh_xac_minh');
  }
  if (user.groupId > 3) {
    hiddenScreens.push('phan_anh_cham_chuyen_tiep');
  }
  if (user.groupId > 4) {
    hiddenScreens.push(
      'phan_anh_chuyen_xu_ly',
      'phan_anh_tra_lai',
      'phan_anh_qua_han',
    );
  }
  if (user.groupId != 5) {
    hiddenScreens.push('phan_anh_da_xu_ly');
  }
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {screens
        .filter(screen => !hiddenScreens.includes(screen.name))
        .map(screen => {
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
    <>
      <PushNotificationService />
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
          options={{headerShown: false, title: ''}}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </>
  );
}
