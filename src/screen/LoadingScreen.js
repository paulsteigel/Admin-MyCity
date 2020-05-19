import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

function LoadingScreen() {
  return (
    <LinearGradient colors={['#4cd48c', '#029547']} style={styles.container}>
      <View style={styles.wraper}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <ActivityIndicator size="large" color="#fff" />
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
  wraper: {
    height: height * 0.6,
    justifyContent: 'space-around',
  },
  logo: {alignSelf: 'center'},
});

export default LoadingScreen;
