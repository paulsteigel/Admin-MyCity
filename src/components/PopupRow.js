import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

function PopupRow({label, placeholder, multiline}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        multiline={multiline}
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
  },
  textInput: {
    borderColor: '#eee',
    borderWidth: 1,
    alignSelf: 'stretch',
  },
});
export default PopupRow;
