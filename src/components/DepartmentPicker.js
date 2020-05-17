import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';
import {BASE_URL} from '../service';
const DepartmentPicker = ({agencyId, onValueChange, selectedValue}) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    Axios.get(`${BASE_URL}/department?agencyId=${agencyId}`).then(res => {
      setDepartments(res.data);
    });
  }, []);
  return (
    <Picker onValueChange={onValueChange} selectedValue={selectedValue}>
      {departments.map(department => (
        <Picker.Item
          label={department.name}
          value={department.id}
          key={department.id}
        />
      ))}
    </Picker>
  );
};

export default DepartmentPicker;
