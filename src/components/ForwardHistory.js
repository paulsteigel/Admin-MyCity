import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {
  CLOSE_POPUP,
  OPEN_LOADING_MODAL,
  CLOSE_LOADING_MODAL,
} from '../redux/constants';
import Axios from 'axios';
import {BASE_URL} from '../service';
const {width} = Dimensions.get('window');

const ForwardHistory = ({feedbackId}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getFbfw();
  }, []);
  const getFbfw = async () => {
    // setLoading(true);
    // dispatch({type: OPEN_LOADING_MODAL});
    try {
      const res = await Axios.get(`${BASE_URL}/fbfw/${feedbackId}`);
      setData(res.data);
    } catch (error) {
      console.log(JSON.stringify(error));
      SimpleToast.show('Có lỗi xảy ra');
      dispatch({type: CLOSE_POPUP});
    }
    setLoading(false);
    // dispatch({type: CLOSE_LOADING_MODAL});
  };
  return (
    <ScrollView>
      <View
        style={{
          alignSelf: 'center',
          width: 0.85 * width - 30,
          paddingBottom: 40,
        }}>
        <ActivityIndicator
          style={{position: 'absolute', top: '50%', left: '50%'}}
          size="large"
          animating={loading}
          color="green"
        />
        {data.map(item => (
          <View key={item.id} style={styles.card}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.bold}>{item.userCreateName}</Text>
              <Text style={{color: '#666', fontSize: 12}}>
                {moment(item.dateCreate).format('DD/MM/YYYY')}
              </Text>
            </View>
            <Text style={{color: '#999'}}>Chuyển phản ánh đến:</Text>
            <Text style={styles.bold}>
              {item.departmentUpdateName || item.agencyIdUpdateName}
            </Text>
            <Text style={{marginTop: 10}}>{item.message}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    width: '100%',
    marginTop: 10,
    flex: 1,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
  bold: {
    flex: 1,
    opacity: 0.6,
    fontWeight: 'bold',
  },
});
export default ForwardHistory;
