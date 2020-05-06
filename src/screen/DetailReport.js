import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {BASE_URL} from '../service';
import Axios from 'axios';
import PhotoView from '@merryjs/photo-viewer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const width = Dimensions.get('window').width;

const DetailReport = ({navigation, ...props}) => {
  const [imageView, setImageView] = useState({visible: false, index: 0});
  const [report, setReport] = useState({});
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/feedback/${props.route.params}`)
      .then(res => {
        let imageList = res.data.image.map(item => ({
          source: {uri: `${BASE_URL}/images/${item}`},
        }));
        setReport(res.data);
        setImageList(imageList);
      })
      .catch(err => {});
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <PhotoView
        visible={imageView.visible}
        data={imageList}
        hideStatusBar={true}
        hideShareButton={true}
        initial={imageView.index}
        onDismiss={e => setImageView({index: 0, visible: false})}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}
        style={styles.container}>
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
                  onPress={() => setImageView({visible: true, index})}>
                  <Image
                    resizeMode="cover"
                    source={source}
                    style={styles.image}
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          <View style={styles.spacer} />
          <View style={styles.reporterInfo}>
            <Text style={styles.title}>Thông tin người gửi</Text>
            <Text style={styles.name}>
              Họ tên: Nguyen Van A {report.userName}
            </Text>
            <Text style={styles.email}>
              Email: anhA@gmail.com {report.userEmail}
            </Text>
            <Text style={styles.phone}>SĐT: 0912395342 {report.userPhone}</Text>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
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
  reporter: {},
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
  },
  handleHistory: {},
});
export default DetailReport;
