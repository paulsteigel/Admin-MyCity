import React from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_POPUP} from '../redux/constants';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConfirmReport from './ConfirmReport';
import UpdateFeedback from './UpdateFeedback';
import VerifyFeedback from './VerifyFeedback';
import QuickHandleFeedback from './QuickHandleFeedback';
import ForwardFeedback from './ForwardFeedback';
import ForwardHistory from './ForwardHistory';
import HandleReport from '../components/HandleReport';
const {height, width} = Dimensions.get('window');
const Popup = () => {
  const dispatch = useDispatch();
  const {
    report,
    fwid,
    url,
    visible,
    popupId,
    popupTitle,
    forwardHistory,
    fromScreen,
  } = useSelector(state => state.popup);

  const renderPopupContent = () => {
    switch (popupId) {
      case 1:
        return <QuickHandleFeedback screen={fromScreen} item={report} />;
      case 2:
        return (
          <ForwardFeedback
            screen={fromScreen}
            item={report}
            fwid={fwid}
            url={url}
          />
        );
      case 3:
        return <VerifyFeedback item={report} />;
      case 4:
        return <UpdateFeedback item={report} />;
      case 5:
        return <ForwardHistory data={forwardHistory} />;
      case 6:
        return <HandleReport item={report} id={fwid} />;
      default:
        return <ConfirmReport />;
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
      <View style={{...styles.container, maxHeight: height * 0.8}}>
        <View style={styles.closeModalBtn}>
          <Icon name="close" onPress={handleClose} size={18} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{popupTitle}</Text>
        </View>
        {renderPopupContent()}
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
