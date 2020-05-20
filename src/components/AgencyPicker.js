import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {BASE_URL} from '../service';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const AgencyPicker = ({onSelectedItemsChange, selectedItems}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let agencies = [];
    Axios.get(`${BASE_URL}/agency`).then(res => {
      res.data.map(agency =>
        agencies.push({
          id: agency.id,
          name: agency.name,
        }),
      );
      setItems([{name: 'Chọn cơ quan', id: 0, children: agencies}]);
    });
  }, []);
  return (
    <SectionedMultiSelect
      hideTags
      items={items}
      uniqueKey="id"
      subKey="children"
      showDropDowns={false}
      selectText="Chọn cơ quan"
      readOnlyHeadings={true}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
      confirmText="Chọn"
      searchPlaceholderText="Tìm kiếm cơ quan..."
    />
  );
};

export default AgencyPicker;
