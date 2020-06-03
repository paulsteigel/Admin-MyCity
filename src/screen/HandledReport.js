/** @format */

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BASE_URL} from '../service';
import Axios from 'axios';
import HandledCard from '../components/HandledCard';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
function HandledReport({navigation, ...props}) {
  const [loadMore, setLoadMore] = useState(true);
  const [refreshing, setRefeshing] = useState(false);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    if (loadMore) loadFeedBack(reports.length);
  }, [loadMore]);

  const dispatch = useDispatch();
  const loadFeedBack = async start => {
    let url = `${BASE_URL}/admin/feedbackforwards/department/forwardedFeedbackForwards?limit=10&skip=${start}`;
    let res = await Axios.get(url);
    // console.log('HandelReportScreen2 report', res.data);

    if (!loadMore) setReports(res.data);
    else setReports(prevState => [...prevState, ...res.data]);
    setLoadMore(false);
    setRefeshing(false);
  };
  const handleRefresh = () => {
    setRefeshing(true);
    loadFeedBack(0);
  };

  const renderList = () => {
    return (
      <FlatList
        contentContainerStyle={{paddingTop: 10}}
        onEndReached={() => setLoadMore(true)}
        data={reports}
        onEndReachedThreshold={0.2}
        keyExtractor={arg => JSON.stringify(arg)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmptyComponent}
        renderItem={({item}) => (
          <HandledCard
            onPress={() => {
              navigation.navigate('detailReport', {
                id: item.feedbackId,
                dropdownOptions: [5],
              });
            }}
            item={item}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{width: width, height: 10}} />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  };
  function listEmptyComponent() {
    return (
      <View style={{height, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Chưa có phản ánh nào</Text>
      </View>
    );
  }
  if (!reports.length && loadMore)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* header */}
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#018037',
        }}>
        <Icon
          style={{color: '#fff', paddingLeft: 20}}
          onPress={() => navigation.toggleDrawer()}
          size={30}
          name="menu"
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              paddingLeft: 20,
            }}>
            Phản ánh đã xử lý
          </Text>
        </View>
      </View>
      {/* end of header */}
      <View style={{paddingHorizontal: 5}}>{renderList()}</View>
      <View style={{position: 'relative'}}>
        {loadMore ? (
          <ActivityIndicator
            style={{position: 'absolute', bottom: 20, left: '50%'}}
            size="large"
            color="green"
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
export default HandledReport;
