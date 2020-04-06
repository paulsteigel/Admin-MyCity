/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/redux/reducer';

const store = createStore(reducer);

AppRegistry.registerComponent(appName, () => Root);

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
