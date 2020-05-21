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
const {width, height} = Dimensions.get('window');

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = async () => {
    try {
      setLoading(true);
      const response = await Axios.post(BASE_URL + '/usersys/authenticate', {
        username,
        password,
      });
      const user = {...response.data.user, token: response.data.token};
      Axios.defaults.headers.common.Authorization = 'Bearer ' + user.token;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({type: LOGIN, payload: user});
    } catch (e) {
      Alert.alert('Sai tên đăng nhập hoặc mật khẩu');
      setPassword('');
      setLoading(false);
    }
  };
  return (
    <LinearGradient colors={['#4cd48c', '#029547']} style={styles.container}>
      <View style={styles.wraper}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <View>
          <Input
            label="Tài khoản"
            placeholder="Nhập tài khoản"
            name="user"
            onChangeText={setUsername}
            value={username}
          />
          <View style={{height: 20}} />
          <Input
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            name="key"
            password
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={login} style={styles.btnLogin}>
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
