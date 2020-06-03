import React, {useState} from 'react';
import {View, Text, TextInput, Platform, StyleSheet} from 'react-native';
// import TextInput from './TextInputOutlined';

const COLOR_UNFOCUSED = '#c5b4b8';
const COLOR_FOCUSED = '#17e357';
function PopupRow({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
}) {
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
        style={{...styles.textInput, borderColor, maxHeight: 150}}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={multiline ? 10 : 1}
        onFocus={handleFocus}
        onBlur={handleUnFocus}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
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
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderWidth: 1,
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
export default PopupRow;
