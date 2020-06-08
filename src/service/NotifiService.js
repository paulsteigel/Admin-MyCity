/*
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {navigate} from './navigation';
import store from '../redux/store';
import {ONREGISTER_FIREBASE} from '../redux/constants';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import React ,{useEffect} from 'react'
import {BASE_URL} from '.';
export default function NotifyService(){
  useEffect(()=>{

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
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // popInitialNotification: true,
      requestPermissions: true,
    });
    console.log("configured");
  },[])
  return null
}
*/
import React from 'react'
import { Platform, View } from 'react-native'
import { Notifications } from 'react-native-notifications'

export default class PushNotificationManager extends React.Component {
  componentDidMount() {
    this.registerDevice()
    this.registerNotificationEvents()
  }

  registerDevice = () => {
    Notifications.events().registerRemoteNotificationsRegistered(event => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Device Token Received', event.deviceToken)
    })
    Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
      console.error(event)
    })

    Notifications.registerRemoteNotifications()
  }

  registerNotificationEvents = () => {
    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log('Notification Received - Foreground', notification)
      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({ alert: false, sound: false, badge: false })
    })

    Notifications.events().registerNotificationOpened((notification, completion) => {
      console.log('Notification opened by device user', notification)
      console.log(`Notification opened with an action identifier: ${notification.identifier}`)
      completion()
    })

    Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
      console.log('Notification Received - Background', notification)

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({ alert: true, sound: true, badge: false })
    })

    Notifications.getInitialNotification()
        .then(notification => {
          console.log('Initial notification was:', notification || 'N/A')
        })
        .catch(err => console.error('getInitialNotifiation() failed', err))
  }

  render() {
    const { children } = this.props
    return <View style={{ flex: 1 }}>{children}</View>
  }
}
