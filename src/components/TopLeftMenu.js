import React, {useEffect} from 'react';
import {TouchableWithoutFeedback, Text, StyleSheet, View} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {OPEN_POPUP} from '../redux/constants';
import {BASE_URL} from '../service';

const popupList = [
  {id: 1, title: 'Xử lý nhanh'},
  {
    id: 2,
    title: 'Chuyển phản ánh',
    url: `${BASE_URL}/admin/feedbacks/forwardFeedback`,
  },
  {
    id: 3,
    title: 'Xác minh phản ánh',
  },
  {
    id: 4,
    title: 'Công khai phản ánh',
  },
  {
    id: 7,
    title: 'Ẩn thông tin người gửi',
  },
  {id: 5, title: 'Lịch sử chuyển phản ánh'},
  {id: 6, title: 'Xử lý phản ánh'},
];
const TopLeftMenu = ({dropdownOptions}) => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  const listDropdown = dropdownOptions.map(item => {
    return popupList.find(i => i.id === item);
  });
  // }, [dropdownOptions]);

  function handleSelect(popupSetting) {
    dispatch({
      type: OPEN_POPUP,
      payload: {...popupSetting, fromScreen: 'detailReport'},
    });
  }
  useEffect(() => {
    console.log(user.groupId);
  }, []);
  return (
    <Menu>
      <MenuTrigger
        customStyles={{TriggerTouchableComponent: TouchableWithoutFeedback}}>
        <View>
          <Icon name="edit" size={25} color="#bcc" style={{padding: 15}} />
        </View>
      </MenuTrigger>
      <MenuOptions>
        {listDropdown.map(item => {
          // if (item.permisstionLevel >= user.groupId)
          return (
            <MenuOption
              key={item.title}
              style={styles.btn}
              onSelect={() => handleSelect(item)}>
              <Text style={styles.text}>{item.title}</Text>
            </MenuOption>
          );
        })}
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
export default TopLeftMenu;
