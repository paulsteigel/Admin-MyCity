import {createStore} from 'redux';
import appReducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN, LOADING_DONE} from './constants';
import Axios from 'axios';
const store = createStore(appReducer);
AsyncStorage.getItem('user')
  .then(user => {
    if (!user) return;
    user = JSON.parse(user);
    Axios.defaults.headers.common.Authorization = 'Bearer ' + user.token;
    store.dispatch({type: LOGIN, payload: user});
  })
  .finally(() => {
    store.dispatch({type: LOADING_DONE});
  });
export default store;
