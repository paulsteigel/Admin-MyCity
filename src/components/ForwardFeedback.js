import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import {TextInput, Switch, ScrollView} from 'react-native-gesture-handler';
import DepartmentPicker from './DepartmentPicker';
import AgencyPicker from './AgencyPicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import {
  CLOSE_POPUP,
  MARK_REPORTS_OUTDATED,
  OPEN_LOADING_MODAL,
  CLOSE_LOADING_MODAL,
  OPEN_ERROR_POPUP,
  NAVIGATE_POP_BACK,
} from '../redux/constants';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-simple-toast';
const ForwardFeedback = ({fwid, screen, item, url}) => {
  const [report] = useState(item);
  const [isPermit, setIsPermit] = useState(true);
  const [departmentIds, setDepartmentIds] = useState([]);
  const [agencyIds, setAgencyIds] = useState([]);
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
  const handleSubmit = () => {
    if (message === '') {
      Toast.show('Nhập lý do chuyển phản ánh');
      return;
    }
    if (isPermit) {
      if (departmentIds.length === 0) {
        Toast.show('Chọn phòng ban xử lý');
        return;
      }
    } else {
      if (agencyIds.length === 0) {
        Toast.show('Chọn cơ quan tiếp nhận');
        return;
      }
    }
    Axios.interceptors.request.use(config => {
      console.log('forward feedback:', config);

      return config;
    });
    dispatch({type: CLOSE_POPUP});
    dispatch({type: OPEN_LOADING_MODAL});
    Axios.post(url, {
      id: fwid,
      feedbackId: report.id,
      isPermit,
      departmentIds: departmentIds,
      agencyIds: agencyIds,
      message,
      fileName,
      fileBase64,
      dateExpired,
    })
      .then(res => {
        if (res.status == 200) {
          Toast.show('Chuyển phản ánh thành công');
          dispatch({
            type: MARK_REPORTS_OUTDATED,
            payload: {isDataOutdated: true},
          });
        } else Alert.alert('Lỗi', 'Chuyển phản ánh thất bại');
        if (screen === 'detailReport') {
          dispatch({type: NAVIGATE_POP_BACK});
        }
      })
      .catch(err => {
        dispatch({type: OPEN_ERROR_POPUP});
        console.log('err forward feedback', JSON.stringify(err));
      })
      .finally(() => {
        dispatch({type: CLOSE_LOADING_MODAL});
      });
  };

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDateExpired(currentDate);
  };
  const onDepartmentSelected = value => {
    setDepartmentIds(value);
  };
  const onAgencySelected = value => {
    setAgencyIds(value);
  };

  return (
    <>
      <ScrollView>
        <View style={{padding: 15}}>
          <View
            style={{
              marginBottom: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
              }}>
              Thuộc thẩm quyền xử lý
            </Text>
            <Switch
              value={isPermit}
              onValueChange={() => {
                setDepartmentIds([]);
                setAgencyIds([]);
                setIsPermit(!isPermit);
              }}
            />
          </View>
          <View>
            {isPermit ? (
              <>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Phòng ban tiếp nhận
                </Text>
                <DepartmentPicker
                  agencyId={user.agencyId}
                  selectedItems={departmentIds}
                  onSelectedItemsChange={onDepartmentSelected}
                />
              </>
            ) : (
              <>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  Đơn vị tiếp nhận
                </Text>
                <AgencyPicker
                  selectedItems={agencyIds}
                  onSelectedItemsChange={onAgencySelected}
                />
              </>
            )}
          </View>
          <View style={{paddingVertical: 10}}>
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
                    <Icon
                      name="attachment"
                      size={20}
                      style={{marginRight: 5}}
                    />
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
          <View style={{paddingTop: 10}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Thời hạn xử lý
            </Text>
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
              <DateTimePicker
                value={dateExpired}
                mode="date"
                onChange={onChange}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderColor: 'lightgreen',
          borderTopWidth: 1,
          paddingVertical: 10,
        }}>
        <Button title="Lưu" color="green" onPress={handleSubmit} />
      </View>
    </>
  );
};

export default ForwardFeedback;
