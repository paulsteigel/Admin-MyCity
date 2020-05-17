import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NewFeedbackForward = () => {
  return (
    <View style={styles.container}>
      <Text>Chưa có phản ánh</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default NewFeedbackForward;
