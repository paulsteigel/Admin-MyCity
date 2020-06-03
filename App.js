import React, {useEffect} from 'react';
import Login from './src/screen/Login';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BackHandler} from 'react-native';
import moment from 'moment';
import localization from 'moment/locale/vi';
import SplashScreen from 'react-native-splash-screen';
import LoadingModal from './src/components/LoadingModal';
import LoadingScreen from './src/screen/LoadingScreen';
import ErrorPopup from './src/components/ErrorPopup';
import StackNavigator from './src/screen/StackNavigator';
import {navigationRef} from './src/service/navigation';
moment.updateLocale('vi', localization);

const App = () => {
  const [user, loadingModal] = useSelector(state => {
    return [state.user, state.loadingModal];
  });

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
  useEffect(SplashScreen.hide, []);
  useEffect(preventBackButtonWhileLoading, [loadingModal.visible]);

  if (user.isLoading) {
    return <LoadingScreen />;
  }

  if (!user.user) {
    return <Login />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
      <ErrorPopup />
      <LoadingModal />
    </NavigationContainer>
  );
};

export default App;
