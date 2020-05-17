import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Keyboard,
  Share,
  Text,
  Button,
  Linking,
  Alert,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {BASE_URL} from '../service';
import Axios from 'axios';
import PhotoView from '@merryjs/photo-viewer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HandleFeedback from '../components/HandleFeedback';
import Popup from '../components/Popup';
import {useSelector, useDispatch} from 'react-redux';
import {MARK_REPORTS_OUTDATED, UPDATE_POPUP_DATA} from '../redux/constants';

const {width, height} = Dimensions.get('window');

const DetailReport = ({navigation, ...props}) => {
  const {id, hideHeaderBtn = false} = props.route.params;
  const [imageView, setImageView] = useState({visible: false, index: 0});
  const [report, setReport] = useState(null);
  const [imageList, setImageList] = useState([]);
  const bottomSheet = useRef(null);

  const dispatch = useDispatch();

  const {isDataOutdated} = useSelector(state => state.pendingReport);

  useEffect(() => {
    let isMounted = true;
    navigation.setOptions({
      headerRight: () => (hideHeaderBtn ? <></> : <HandleFeedback />),
    });
    loadReport(isMounted);
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    if (!isDataOutdated) return;
    loadReport(true);
    dispatch({type: MARK_REPORTS_OUTDATED, payload: {isDataOutdated: false}});
  }, [isDataOutdated]);

  const loadReport = isMounted => {
    Axios.get(`${BASE_URL}/admin/feedbacks/${id}`)
      .then(res => {
        // console.log(res.data.images);
        let imageList = res.data.images.map(item => ({
          source: {uri: `${BASE_URL}/images/${item.id}`},
        }));
        if (!isMounted) return;
        setReport(res.data);
        dispatch({type: UPDATE_POPUP_DATA, payload: res.data});
        // console.log(res.data.user);

        setImageList(imageList);
      })
      .catch(err => {});
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
          <Text style={styles.location}>Địa điểm: {report.address}</Text>
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
        <View style={{padding: 20}}>
          {hideHeaderBtn || (
            <Button
              title="Thông tin người phản ánh"
              onPress={() => bottomSheet.current.open()}
            />
          )}
        </View>
      </ScrollView>
      <BottomSheet
        height={height * 0.23}
        duration={450}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
        closeOnDragDown={true}
        ref={bottomSheet}>
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>Thông tin người gửi</Text>
          <View style={styles.bottomSheetBody}>
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
            <View>
              <Text>Họ tên: {report.user.name}</Text>
              <Text>Email: {report.user.email}</Text>
              <View style={styles.callBtn}>
                <Text>Điện thoại: {report.user.phone}</Text>
                <Icon
                  style={styles.callIcon}
                  name="phone"
                  size={30}
                  color="#fff"
                  onPress={() => {
                    Linking.openURL(`tel:${report.user.phone}`);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
    // justifyContent: 'space-between',
  },
  callIcon: {
    backgroundColor: '#3b2',
    padding: 5,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginLeft: 10,
  },
  callBtn: {
    // backgroundColor: '#3b2',
    borderRadius: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomSheetBody: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
