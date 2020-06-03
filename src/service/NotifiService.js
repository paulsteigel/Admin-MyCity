import PushNotification from 'react-native-push-notification';
import {navigate} from './navigation';
import store from '../redux/store';
import {ONREGISTER_FIREBASE} from '../redux/constants';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {BASE_URL} from '.';
PushNotification.configure({
  onRegister: function({token}) {
    console.log( "TOken: ",token);

    store.dispatch({type: ONREGISTER_FIREBASE, payload: token});
    AsyncStorage.getItem('user').then(value => {
      if (value) {
        const user = JSON.parse(value);
        Axios.post(`${BASE_URL}/usersys/updateToken`, {token, id: user.id})
          .then(res => {
            console.log('Uploaded Token', res.data);
          })
          .catch(err => {
            console.log('err updateToken:', err);
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
        let option = [];

        navigate('detailReport', {id: feedbackId, dropdownOptions: option});
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
