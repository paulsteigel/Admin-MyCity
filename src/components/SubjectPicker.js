import React, {useState, useEffect} from 'react';
import {Picker} from 'react-native';
import Axios from 'axios';
import {BASE_URL} from '../service';

const SubjectPicker = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    Axios(BASE_URL + '/subjects').then(res => {
      setSubjects(res.data);
    });
  }, []);
  return (
    <Picker>
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
