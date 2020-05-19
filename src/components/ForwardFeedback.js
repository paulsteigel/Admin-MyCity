import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Alert, TouchableWithoutFeedback} from 'react-native';
import {TextInput, Switch} from 'react-native-gesture-handler';
import DepartmentPicker from './DepartmentPicker';
import AgencyPicker from './AgencyPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import {CLOSE_POPUP, MARK_REPORTS_OUTDATED} from '../redux/constants';
import {BASE_URL} from '../service';
import RNFetchBlob from 'rn-fetch-blob';

const ForwardFeedback = ({fwid, item, isSubmit, setIsSubmit}) => {
  const [report] = useState(item);
  const [isPermit, setIsPermit] = useState(true);
  const [departmentId, setDepartmentId] = useState(0);
  const [agencyId, setAgencyId] = useState(0);
  const [dateExpired, setDateExpired] = useState(new Date());
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const selectFileAsync = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFileName(res.name);
      RNFetchBlob.fs
        .readFile(res.uri, 'base64')
        .then(data => {
          setFileBase64(data);
        })
        .catch(err => console.log('react native fetch blob error', err));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        throw err;
      }
    }
  };

  const {user} = useSelector(state => state.user);

  useEffect(() => {
    if (!isSubmit) return;
    // console.log('start request', report);
    Axios.post(`${BASE_URL}/admin/feedbacks/forwardFeedback`, {
      id: fwid,
      feedbackId: report.id,
      isPermit,
      departmentIds: [departmentId],
      agencyIds: [agencyId],
      message,
      fileName,
      fileBase64,
      dateExpired,
    })
      .then(res => {
        if (res.status == 200) {
          Alert.alert('Thành công', 'Xử lý nhanh phản ánh thành công');
          dispatch({
            type: MARK_REPORTS_OUTDATED,
            payload: {isDataOutdated: true},
          });
        } else Alert.alert('Lỗi', 'Xử lý nhanh phản ánh thất bại');
        setIsSubmit(false);
      })
      .catch(err => console.log('err forward feedback', JSON.stringify(err)))
      .finally(() => {
        dispatch({type: CLOSE_POPUP});
      });
  }, [isSubmit]);

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDateExpired(currentDate);
  };
  const handleValueChanged = value => {
    setDepartmentId(prevState => [...prevState, value]);
    console.log(departmentId);
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
            onValueChange={value => setDepartmentId(value)}
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
            {fileName !== '' && (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                }}>
                <Icon name="attachment" size={20} style={{marginRight: 5}} />
                <Text numberOfLines={1}>{fileName}</Text>
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
