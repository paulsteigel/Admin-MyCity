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
import StackNavigator from './src/screen/StackNavigator';
import {navigationRef} from './src/service/navigation';
moment.updateLocale('vi', localization);

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

export default App;
