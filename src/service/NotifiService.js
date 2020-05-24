import PushNotification from 'react-native-push-notification';
import Axios from 'axios';
import {BASE_URL} from '.';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from './navigation';
import store from '../redux/store';
import {ONREGISTER_FIREBASE} from '../redux/constants';
PushNotification.configure({
  onRegister: function({token}) {
    store.dispatch({type: ONREGISTER_FIREBASE, payload: token});
    AsyncStorage.getItem('user').then(value => {
      if (value !== null) {
        const user = JSON.parse(value);
        Axios.post(`${BASE_URL}/usersys/updateToken`, {token, id: user.id})
          .then(res => {
            console.log('Uploaded Token', res.data);
          })
          .catch(err => {
            console.log('err updateToken:', JSON.stringify(err));
          });
      } else console.log('no user');
    });
  },
  onNotification: function(notification) {
    console.log('onNotification:', notification);
    let type, feedbackId;
    if (notification.data) {
      type = notification.data.type;
      feedbackId = notification.data.feedbackId;
      console.log('if assigned');
    } else {
      type = notification.type;
      feedbackId = notification.feedbackId;
      console.log('else assignd');
    }
    if (type !== 'newfeedback') return;

    if (notification.userInteraction || !notification.foreground) {
      setTimeout(() => {
        navigate('detailReport', {id: feedbackId});
      }, 100);
    }
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  // popInitialNotification: true,
  requestPermissions: true,
});
