import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {TextInput, Switch} from 'react-native-gesture-handler';
import DepartmentPicker from './DepartmentPicker';
import AgencyPicker from './AgencyPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import {CLOSE_POPUP} from '../redux/constants';
import {BASE_URL} from '../service';

const ForwardFeedback = ({item, isSubmit, setIsSubmit}) => {
  const [report] = useState(item);
  const [isPermit, setIsPermit] = useState(true);
  const [departmentId, setDepartmentId] = useState([]);
  const [agencyId, setAgencyId] = useState([]);
  const [dateExpired, setDateExpired] = useState(new Date());
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const selectFileAsync = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        throw err;
      }
    }
  };

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSubmit) return;
    const payload = new FormData();
    payload.append('feedbackId', report.id.toString());
    payload.append('isPermit', isPermit.toString());
    payload.append('departmentIds', departmentId.toString());
    payload.append('agencyIds', agencyId.toString());
    payload.append('message', message);
    payload.append('file', JSON.stringify(file));
    payload.append('dateExpired', dateExpired);
    console.log('payload', payload);
    Axios.post(`${BASE_URL}/admin/feedbacks/forwardFeedback`, payload)
      .then(res => {
        console.log(res);
        console.log(res).data;
      })
      .catch(err => console.log('err', JSON.stringify(err)));
    dispatch({type: CLOSE_POPUP});
    setIsSubmit(false);
  }, [isSubmit]);

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDateExpired(currentDate);
  };

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
        <TouchableWithoutFeedback onPress={selectFileAsync}>
          <View
            style={{
              padding: 10,
            }}>
            <Text>Bấm để chọn file</Text>
            {file && (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                }}>
                <Icon name="attachment" size={20} style={{marginRight: 5}} />
                <Text numberOfLines={1}>{file.name}</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
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
          onChangeText={message => setMessage(message)}
        />
      </View>
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Thời hạn xử lý</Text>
        <TouchableWithoutFeedback onPress={() => setShow(true)}>
          <View>
            <TextInput
              style={{borderColor: '#eee', borderWidth: 1}}
              editable={false}
              value={moment(dateExpired).format('DD/MM/YYYY')}
            />
          </View>
        </TouchableWithoutFeedback>
        {show && (
          <DateTimePicker value={dateExpired} mode="date" onChange={onChange} />
        )}
      </View>
    </View>
  );
};

export default ForwardFeedback;
