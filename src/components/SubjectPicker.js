import React from 'react';
import {Picker} from '@react-native-community/picker';
import {useSelector} from 'react-redux';

const SubjectPicker = ({onValueChange, selectedValue}) => {
  const subjects = useSelector(state => state.subject);
  return (
    <Picker onValueChange={onValueChange} selectedValue={selectedValue}>
      {subjects.map(subject => (
        <Picker.Item
          label={subject.subArea}
          value={subject.id}
          key={subject.id}
        />
      ))}
    </Picker>
  );
};

export default SubjectPicker;
