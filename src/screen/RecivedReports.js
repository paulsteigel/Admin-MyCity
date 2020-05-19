import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewFeedbackForward from '../components/NewFeedbackForward';
import FowardedReport from '../components/FowardedReport';
import RejectedReport from '../components/RejectedReport';
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
        component={NewFeedbackForward}
        name="recivedReport"
        options={{title: 'Phản ánh mới tiếp nhận'}}
      />
      <Tabbar.Screen
        component={RejectedReport}
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
