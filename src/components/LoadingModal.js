/** @format */

import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
function LoadingModal() {
  const {visible, text} = useSelector(state => state.loadingModal);

  if (visible)
    return (
      <>
        <View style={styles.loadingModal} />
        <View style={styles.child}>
          <ActivityIndicator size="large" color="green" />
          <Text>{text}</Text>
        </View>
      </>
    );
  return <></>;
}
function AnimatedLoadingModal() {}
const styles = StyleSheet.create({
  child: {
    backgroundColor: '#fff',
    width: 250,
    height: 100,
    opacity: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 20,
    zIndex: 20,
    position: 'absolute',
    top: '50%',
    left: (width - 250) / 2,
  },
  loadingModal: {
    position: 'absolute',
    width,
    height,
    backgroundColor: '#000',
    opacity: 0.7,
    zIndex: 20,
  },
});
export default LoadingModal;
