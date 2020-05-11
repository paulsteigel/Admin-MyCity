import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
// import TextInput from './TextInputOutlined';

const COLOR_UNFOCUSED = '#c5b4b8';
const COLOR_FOCUSED = '#17e357';
function PopupRow({label, placeholder, multiline}) {
  const [borderColor, setBorderColor] = useState(COLOR_UNFOCUSED);
  const handleFocus = () => {
    setBorderColor(COLOR_FOCUSED);
  };
  const handleUnFocus = () => {
    setBorderColor(COLOR_UNFOCUSED);
    console.log('blurred');
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={{...styles.textInput, borderColor}}
        placeholder={placeholder}
        multiline={multiline}
        onFocus={handleFocus}
        onBlur={handleUnFocus}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
  },
  textInput: {
    // borderColor: '#eee',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
export default PopupRow;
