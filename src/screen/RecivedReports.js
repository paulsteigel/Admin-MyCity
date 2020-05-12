import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RecivedReport from '../components/RecivedReport';
import FowardedReport from '../components/FowardedReport';
import ReturnedReport from '../components/ReturnedReport';
const Tabbar = createMaterialTopTabNavigator();
const TABBAR_OPTION = {
  labelStyle: {fontSize: 12},
  inactiveTintColor: 'black',
  activeTintColor: '#2c73e6',
  allowFontScaling: false,
};
const RecivedReports = props => {
  return (
    <Tabbar.Navigator tabBarOptions={TABBAR_OPTION}>
      <Tabbar.Screen
        component={RecivedReport}
        name="recivedReport"
        options={{title: 'Phản ánh mới tiếp nhận'}}
      />
      <Tabbar.Screen
        component={ReturnedReport}
        name="returnReport"
        options={{title: 'Phản ánh trả lại'}}
      />
      <Tabbar.Screen
        component={FowardedReport}
        name="fowardedReport"
        options={{title: 'Phản ánh đã chuyển tiếp'}}
      />
    </Tabbar.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default RecivedReports;
