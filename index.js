/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import appReducer from './src/redux/reducers';
const store = createStore(appReducer);
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN} from './src/redux/constants';
import Axios from 'axios';
import {MenuProvider} from 'react-native-popup-menu';
AsyncStorage.getItem('user').then(user => {
  if (!user) return;
  user = JSON.parse(user);
  Axios.defaults.headers.common.Authorization = 'Bearer ' + user.token;
  store.dispatch({type: LOGIN, payload: user});
});
function ReduxProvier() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => ReduxProvier);
