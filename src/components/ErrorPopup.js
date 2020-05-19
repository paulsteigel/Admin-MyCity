import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_ERROR_POPUP} from '../redux/constants';
import Modal from 'react-native-modal';
const {width} = Dimensions.get('window');
const ErrorPopup = () => {
  const dispatch = useDispatch();

  const height = 400;
  const visible = useSelector(state => state.errorPopup);

  const handleClose = () => dispatch({type: CLOSE_ERROR_POPUP});
  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      isVisible={visible}
      avoidKeyboard={true}>
      <View style={{...styles.container, height}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Có lỗi xảy ra</Text>
        </View>
        <View>
          <Image
            source={require('../assets/error_image.png')}
            style={{height: height - 100, width: width * 0.85}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Thử lại sau" color="green" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  titleContainer: {
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    borderColor: 'lightgreen',
    paddingVertical: 10,
  },
});
export default ErrorPopup;
