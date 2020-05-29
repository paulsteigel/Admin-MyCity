import PushNotification from 'react-native-push-notification';
import {navigate} from './navigation';
import store from '../redux/store';
import {ONREGISTER_FIREBASE} from '../redux/constants';
PushNotification.configure({
  onRegister: function({token}) {
    console.log(token);

    store.dispatch({type: ONREGISTER_FIREBASE, payload: token});
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
