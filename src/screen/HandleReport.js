import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HandeReportSceen1 from './HandeReportSceen1';
import HandeReportSceen2 from './HandeReportSceen2';
const Tabbar = createMaterialTopTabNavigator();
const TABBAR_OPTION = {
  labelStyle: {fontSize: 12},
  inactiveTintColor: 'black',
  activeTintColor: '#2c73e6',
  allowFontScaling: false,
};
const HandleReport = () => {
  return (
    <Tabbar.Navigator tabBarOptions={TABBAR_OPTION}>
      <Tabbar.Screen
        component={HandeReportSceen1}
        name="phan_anh_can_xu_ly"
        options={{title: 'Phản ánh cần xử lý'}}
      />
      <Tabbar.Screen
        component={HandeReportSceen2}
        name="phan_anh_da_xu_ly"
        options={{title: 'Phản ánh đã xử lý'}}
      />
    </Tabbar.Navigator>
  );
};

export default HandleReport;
