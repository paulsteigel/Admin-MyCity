import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {TextInput, Switch} from 'react-native-gesture-handler';
import DepartmentPicker from './DepartmentPicker';
import AgencyPicker from './AgencyPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const ForwardFeedback = ({item, isSubmit, setIsSubmit}) => {
  const [report, setReport] = useState(item);
  const [isPermit, setIsPermit] = useState(true);
  const [departmentId, setDepartmentId] = useState(null);
  const [agencyId, setAgencyId] = useState(null);
  const user = useSelector(state => state.user);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const dispatch = useDispatch();

  return (
    <View style={{padding: 15}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Thuộc thẩm quyền xử lý
        </Text>
        <Switch value={isPermit} onValueChange={() => setIsPermit(!isPermit)} />
      </View>
      {isPermit ? (
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Phòng ban tiếp nhận
          </Text>
          <DepartmentPicker
            agencyId={user.agencyId}
            selectedValue={departmentId}
            onValueChange={departmentId => setDepartmentId(departmentId)}
          />
        </View>
      ) : (
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Đơn vị tiếp nhận
          </Text>
          <AgencyPicker
            selectedValue={agencyId}
            onValueChange={agencyId => setAgencyId(agencyId)}
          />
        </View>
      )}
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Tài liệu đính kèm
        </Text>
      </View>
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Lý do chuyển phản ánh
        </Text>
        <TextInput
          style={{
            borderColor: '#eee',
            borderWidth: 1,
            textAlignVertical: 'top',
            borderRadius: 10,
          }}
          multiline
          numberOfLines={5}
          onChangeText={description => setReport({...report, description})}
        />
      </View>
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Thời hạn xử lý</Text>
        <TouchableWithoutFeedback onPress={showMode}>
          <View>
            <TextInput
              style={{borderColor: '#eee', borderWidth: 1}}
              editable={false}
              value={moment(date).format('DD/MM/YYYY')}
            />
          </View>
        </TouchableWithoutFeedback>
        {show && (
          <DateTimePicker value={date} mode="date" onChange={onChange} />
        )}
      </View>
    </View>
  );
};

export default ForwardFeedback;
