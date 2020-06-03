import React from 'react';
import {View, Text, StyleSheet, Platform, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');

export default function Input(props) {
  const {editable = true} = props;
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#4cd48c', '#35ce7d']}
        style={{borderRadius: 10, elevation: 10}}>
        <Icon name={props.name} color="#fff" size={18} style={styles.icons} />
        <TextInput
          editable={editable}
          autoCapitalize="none"
          placeholderTextColor="#ddd"
          placeholder={props.placeholder}
          style={styles.textInput}
          autoCorrect={false}
          secureTextEntry={props.password}
          onChangeText={props.onChangeText}
          value={props.value}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    position: 'absolute',
    top: '32%',
    left: 15,
  },
  textInput: {
    width: width - 100,
    paddingLeft: 50,
    color: '#fff',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  label: {
    textAlign: 'left',
    color: '#fff',
    marginBottom: 5,
    marginLeft: 5,
  },
});
