/** @format */

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {BASE_URL} from '../service';
import Axios from 'axios';
import ForwardComponent from './ForwardedCard';
const {width, height} = Dimensions.get('window');

function ForwardedReport({navigation, ...props}) {
  const [loadMore, setLoadMore] = useState(true);
  const [refreshing, setRefeshing] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (loadMore) loadFeedBack(reports.length);
  }, [loadMore]);

  const loadFeedBack = async start => {
    let url = `${BASE_URL}/admin/feedbackforwards/agency/forwardedFeedbackForwards?limit=10&skip=${start}`;
    let res = await Axios.get(url);
    console.log(res.data.length);

    if (!loadMore) setReports(res.data);
    else setReports(prevState => [...prevState, ...res.data]);
    setLoadMore(false);
    setRefeshing(false);
  };
  const handleRefresh = () => {
    setRefeshing(true);
    loadFeedBack(0);
  };
  const forwarding = () => {
    console.log('forwarding this feedback');
  };
  const navigate = () => {
    console.log('navigating');
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
          <ForwardComponent
            navigate={navigate}
            forwarding={forwarding}
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
    <View style={{flex: 1, paddingHorizontal: 5}}>
      {renderList()}
      <View style={{position: 'relative'}}>
        {loadMore ? (
          <ActivityIndicator
            style={{position: 'absolute', bottom: 20, left: '50%'}}
            size="large"
            color="green"
          />
        ) : null}
      </View>
    </View>
  );
}
export default ForwardedReport;
