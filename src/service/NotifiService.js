import PushNotification from 'react-native-push-notification';
import Axios from 'axios';
import {BASE_URL} from '.';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from './navigation';
PushNotification.configure({
  onRegister: function({token}) {
    console.log('onRegister:', token);
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
      }
    });
  },
  onNotification: function(notification) {
    console.log('onNotification:', notification);
    const {type, feedbackId} = notification.data;

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
