import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/LoginInput';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {LOGIN} from '../redux/constants';
import {BASE_URL} from '../service';
import SimpleToast from 'react-native-simple-toast';
const {width, height} = Dimensions.get('window');

function Login() {
  const curUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = async () => {
    if (username === '' || password === '') return;
    try {
      setLoading(true);
      const response = await Axios.post(BASE_URL + '/usersys/authenticate', {
        username,
        password,
        token: curUser.firebaseToken,
      });
      const user = {...response.data.user, token: response.data.token};
      Axios.defaults.headers.common.Authorization = 'Bearer ' + user.token;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({type: LOGIN, payload: user});
    } catch (e) {
      if (e.status === 401) SimpleToast.show('Sai tên đăng nhập hoặc mật khẩu');
      else SimpleToast.show('Có lỗi xảy ra');
      setPassword('');
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <LinearGradient colors={['#4cd48c', '#029547']} style={styles.container}>
      <View style={styles.wraper}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <View>
          <Input
            label="Tài khoản"
            editable={!loading}
            placeholder="Nhập tài khoản"
            name="user"
            onChangeText={setUsername}
            value={username}
          />
          <View style={{height: 20}} />
          <Input
            editable={!loading}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            name="key"
            password
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            disabled={loading}
            onPress={login}
            style={styles.btnLogin}>
            {!loading ? (
              <Text style={styles.txtLogin}>Đăng nhập</Text>
            ) : (
              <ActivityIndicator size="large" color="#23b367" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    width: width - 100,
    backgroundColor: '#eee',
    marginTop: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 10,
  },
  txtLogin: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#23b367',
  },
  wraper: {
    height: height * 0.6,
    justifyContent: 'space-around',
  },
  logo: {alignSelf: 'center'},
});

export default Login;
