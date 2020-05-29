import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Text,
  Button,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {BASE_URL} from '../service';
import Axios from 'axios';
import PhotoView from '@merryjs/photo-viewer';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TopLeftMenu from '../components/TopLeftMenu';
import {useSelector, useDispatch} from 'react-redux';
import {MARK_REPORTS_OUTDATED, UPDATE_POPUP_DATA} from '../redux/constants';
import Popup from '../components/Popup';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
const HANDLE_STATUS = [
  'Khởi tạo',
  'Chuyển xử lý',
  'Phân công xử lý',
  'Đang xử lý',
  'Đã phản hồi thông tin',
  'Đã xác minh',
  'Phản ánh bị trả lại',
];
const COLOR = [
  '#8c9c8e',
  '#777',
  '#777',
  '#e0db4a',
  '#34eb46',
  '#23cc77',
  '#d43131',
];
const DetailReport = ({navigation, ...props}) => {
  const {id, dropdownOptions} = props.route.params;
  const [imageView, setImageView] = useState({visible: false, index: 0});
  const [report, setReport] = useState(null);
  const [imageList, setImageList] = useState([]);
  const bottomSheet = useRef(null);
  const dispatch = useDispatch();

  const {isDataOutdated, popBack} = useSelector(state => state.pendingReport);
  const {user} = useSelector(state => state.user);
  const firstRender = useRef(0);
  const isMounted = useRef(true);
  useEffect(() => {
    if (firstRender.current === 0) {
      firstRender.current++;
      return;
    }
    navigation.pop();
  }, [popBack]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <TopLeftMenu dropdownOptions={dropdownOptions} />,
    });
    loadReport(isMounted.current);
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (!isDataOutdated) return;
    loadReport(isMounted.current);
    dispatch({type: MARK_REPORTS_OUTDATED, payload: {isDataOutdated: false}});
  }, [isDataOutdated]);

  const loadReport = async isMounted => {
    try {
      if (!isMounted) return;
      const res = await Axios.get(`${BASE_URL}/admin/feedbacks/${id}`);
      // console.log('res', res.status, res.data);
      let imageList = res.data.images.map(item => ({
        source: {uri: `${BASE_URL}/images/${item.id}`},
      }));
      if (!isMounted) return;
      setReport(res.data);
      dispatch({type: UPDATE_POPUP_DATA, payload: res.data});
      setImageList(imageList);
    } catch (err) {
      console.log('DetailReport err', err);
    }
  };

  if (!report) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <PhotoView
        visible={imageView.visible}
        data={imageList}
        hideStatusBar={true}
        hideShareButton={true}
        initial={imageView.index}
        onDismiss={e => setImageView({index: 0, visible: false})}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{report.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.location, flex: 1}}>
              Lĩnh vực: {report.subArea}
            </Text>
            <Text style={styles.createdAt}>
              {moment(report.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Text style={styles.location}>Địa điểm: {report.address}</Text>
          <Text style={{color: COLOR[report.status], fontSize: 13}}>
            Trạng thái {HANDLE_STATUS[report.status]}
          </Text>
          <View style={styles.spacer} />
          <Text>{report.content}</Text>
        </View>
        <View style={styles.images}>
          {imageList.map(({source}, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                style={styles.image}
                onPress={() => setImageView({visible: true, index})}>
                <Image
                  style={{width: width - 10, height: 200}}
                  resizeMode="cover"
                  source={source}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        {report.status === 4 ? (
          <View style={{paddingHorizontal: 5, paddingVertical: 10}}>
            <Text style={{opacity: 0.7, color: '#333'}}>
              Phản hồi từ chính quyền:
            </Text>
            <Text style={{color: '#bf280d'}}>{report.description}</Text>
          </View>
        ) : null}
      </ScrollView>
      {user.groupId <= 3 || !report.isHide ? (
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Button
            title="Thông tin người phản ánh"
            onPress={() => bottomSheet.current.open()}
          />
        </View>
      ) : null}
      <Popup feedbackId={id} />
      <BottomSheet
        // height={height * 0.23}
        duration={450}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
        closeOnDragDown={true}
        ref={bottomSheet}>
        <UserInfo user={report.user} />
      </BottomSheet>
    </SafeAreaView>
  );
};
function UserInfo({user}) {
  return (
    <View style={styles.bottomSheet}>
      <Text style={styles.bottomSheetTitle}>Thông tin người gửi</Text>
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/user_avatar.png')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              overflow: 'hidden',
            }}
            borderRadius
          />
          <View style={{paddingLeft: 5}}>
            <Text>Họ tên: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Điện thoại:{user.phone}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.callIcon}
          onPress={() => {
            Linking.openURL(`tel:${user.phone}`);
          }}>
          <Icon
            // style={styles.callIcon}
            name="phone"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
    // justifyContent: 'space-between',
  },
  callIcon: {
    backgroundColor: '#3b2',
    elevation: 1,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    alignSelf: 'center',
  },
  callBtn: {
    // backgroundColor: '#3b2',
    borderRadius: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomSheetBody: {
    justifyContent: 'space-around',
    // alignItems: 'center',
    flex: 1,
  },

  bottomSheetTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSheet: {
    flex: 1,
  },
  location: {
    opacity: 0.5,
    fontSize: 13,
  },
  createdAt: {
    fontSize: 12,
    opacity: 0.5,
    color: '#666',
  },
  spacer: {
    height: 20,
  },
  header: {
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  images: {
    flexDirection: 'column',
  },
  image: {
    height: 200,
    width: width - 10,
    alignSelf: 'center',
    marginTop: 3,
    backgroundColor: '#eee',
  },
  handleHistory: {},
});
export default DetailReport;
