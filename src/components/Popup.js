import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_POPUP} from '../redux/constants';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import ConfirmReport from './ConfirmReport';
import UpdateFeedback from './UpdateFeedback';
const {width} = Dimensions.get('window');
const Popup = ({id}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const {visible, popupTitle, height} = useSelector(state => state.popup);

  const renderPopupContent = () => {
    switch (popupId) {
      case 10:
        return <UpdateFeedback id={id} />;
      default:
        return <ConfirmReport isSubmit={isSubmit} />;
    }
  };

  const handleClose = () => dispatch({type: CLOSE_POPUP});
  return (
    <Modal
      useNativeDriver={true}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      isVisible={visible}
      avoidKeyboard={true}>
      <View style={{...styles.container, height}}>
        <View style={styles.closeModalBtn}>
          <Icon name="close" onPress={handleClose} size={18} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{popupTitle}</Text>
        </View>
        <ScrollView>{renderPopupContent()}</ScrollView>
        <View style={styles.buttonContainer}>
          <Button title="OK" color="green" onPress={() => setIsSubmit(true)} />
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
    borderColor: 'lightgreen',
    borderBottomWidth: 1,
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
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  closeModalBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -10,
    top: -10,
  },
});
export default Popup;
