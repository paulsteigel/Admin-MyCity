import React, {useState} from 'react';
import DetailReport from './DetailReport';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import Dashboard from './Dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HandleReport from './HandleReport';
import RecivedReports from './RecivedReports';
import CustomDrawerContent from '../components/CustomDrawer';
import '../service/NotifiService';
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
export default function StackNavigator() {
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
