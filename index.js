/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import store from './src/redux/store';

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
