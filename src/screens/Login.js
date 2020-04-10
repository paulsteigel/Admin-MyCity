import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import {TouchableOpacity, Switch} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/LoginInput';
const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, []);
  const login = async () => {
    setLoading(true);
    setTimeout(() => {
      console.log('logged in');
      navigation.navigate('dashboard');
      setLoading(false);
    }, 1000);
  };
  return (
    <LinearGradient colors={['#4cd48c', '#029547']} style={styles.container}>
      <View style={styles.wraper}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <View>
          <Input label="Tài khoản" placeholder="Nhập tài khoản" name="user" />
          <View style={{height: 35}} />
          <Input
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            name="key"
            password
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
