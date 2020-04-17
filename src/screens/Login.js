import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/LoginInput';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = async () => {
    setLoading(true);
    fetch('http://api.kncb.itkv4.com/usersys/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(res => {
        if (res.status === 401) {
          Alert.alert(
            'Đăng nhập không thành công',
            'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại',
            // [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            // {cancelable: false},
          );
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        dispatch({
          type: 'LOGIN',
          payload: data.token,
        });
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
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
          />
          <View style={{height: 20}} />
          <Input
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            name="key"
            password
            onChangeText={setPassword}
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
};

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
