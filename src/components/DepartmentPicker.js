import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';
import {BASE_URL} from '../service';
import {View} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const DepartmentPicker = ({agencyId, onSelectedItemsChange, selectedItems}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let departments = [];
    Axios.get(`${BASE_URL}/department?agencyId=${agencyId}`)
      .then(res => {
        res.data.map(department =>
          departments.push({
            id: department.id,
            name: department.name,
          }),
        );
        setItems([{name: 'Chọn đơn vị', id: 0, children: departments}]);
      })
      .catch(err => console.log('err', JSON.stringify(err)));
  }, []);
  return (
    <SectionedMultiSelect
      hideTags
      items={items}
      uniqueKey="id"
      subKey="children"
      showDropDowns={false}
      selectText="Chọn phòng ban"
      readOnlyHeadings={true}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
      confirmText="Chọn"
      searchPlaceholderText="Tìm kiếm phòng ban..."
    />
  );
};

export default DepartmentPicker;
