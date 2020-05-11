import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {OPEN_POPUP} from '../redux/constants';
const {height} = Dimensions.get('window');
const popupList = [
  {height: height * 0.3, title: 'Xử lý nhanh'},
  {height: height * 0.4, title: 'Chuyển phản ánh'},
  {height: height * 0.4, title: 'Xác minh phản ánh'},
  {height: height * 0.3, title: 'Xóa phản ánh'},
  {height: height * 0.3, title: 'Công khai phản ánh'},
  {height: height * 0.5, title: 'Ẩn thông tin người phản ánh'},
];
const HandleFeedback = props => {
  const dispatch = useDispatch();
  function handleSelect(popupSetting) {
    dispatch({type: OPEN_POPUP, payload: popupSetting});
  }

  return (
    <Menu>
      <MenuTrigger
        customStyles={{TriggerTouchableComponent: TouchableWithoutFeedback}}>
        <Icon name="edit" size={25} color="#bcc" style={{marginRight: 15}} />
      </MenuTrigger>
      <MenuOptions>
        {popupList.map(item => (
          <MenuOption
            key={item.title}
            style={styles.btn}
            onSelect={() => handleSelect(item)}>
            <Text style={styles.text}>{item.title}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};
const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    borderColor: '#eee',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
});
export default HandleFeedback;
