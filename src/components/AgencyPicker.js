import React, {useState, useEffect} from 'react';
import {Picker} from 'react-native';
import Axios from 'axios';
import {BASE_URL} from '../service';
const AgencyPicker = ({onValueChange, selectedValue}) => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    Axios.get(`${BASE_URL}/agency`).then(res => {
      setAgencies(res.data);
    });
  }, []);
  return (
    <Picker onValueChange={onValueChange} selectedValue={selectedValue}>
      {agencies.map(agency => (
        <Picker.Item label={agency.name} value={agency.id} key={agency.id} />
      ))}
    </Picker>
  );
};

export default AgencyPicker;
