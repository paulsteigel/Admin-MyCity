import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Row from './PopupRow';

const ConfirmReport = ({isSubmit}) => {
  useEffect(() => {
    if (!isSubmit) return;
    // TODO: logic submit go here
  }, [isSubmit]);
  return (
    <>
      <Row
        label="Ý kiến tổ xác minh"
        placeholder="Ý kiến tổ xác minh"
        multiline
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default ConfirmReport;
