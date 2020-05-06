import Axios from 'axios';
import {BASE_URL} from '.';
import AsyncStorage from '@react-native-community/async-storage';

export async function userLogin(username, password) {
  const response = await Axios.post(BASE_URL + '/usersys/authenticate', {
    username,
    password,
  });
  console.log(response);

  const user = {...response.user, token: response.token};
  Axios.defaults.headers.common.Authorization = 'Bearer ' + user.token;
  await AsyncStorage.setItem('user', JSON.stringify(user));
  return user;
}
