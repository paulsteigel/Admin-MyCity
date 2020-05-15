/** @format */

import React, {useReducer, useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {BASE_URL} from '../service';
import ListItem from '../components/ListItem';
import Axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {MARK_REPORTS_OUTDATED} from '../redux/constants';

const {width, height} = Dimensions.get('window');

function Dashboard({navigation, ...props}) {
  const {isDataOutdated} = useSelector(state => state.pendingReport);
  const dispatch = useDispatch();

  const [loadMore, setLoadMore] = useState(true);
  const [reports, setReports] = useState([]);
  const [refreshing, setRefeshing] = useState(false);

  useEffect(() => {
    if (loadMore) loadFeedBack(reports.length);
  }, [loadMore]);
  useEffect(() => {
    if (isDataOutdated) {
      loadFeedBack(0);
      dispatch({type: MARK_REPORTS_OUTDATED, payload: {isDataOutdated: false}});
    }
  }, [isDataOutdated]);

  const loadFeedBack = async start => {
    let url = `${BASE_URL}/admin/feedbacks/pendingFeedbacks?limit=10&skip=${start}`;
    let res = await Axios.get(url);

    if (!loadMore) setReports(res.data);
    else setReports(prevState => [...prevState, ...res.data]);
    setLoadMore(false);
    setRefeshing(false);
  };
  const handleRefresh = () => {
    setRefeshing(true);
    loadFeedBack(0);
  };
  useEffect(() => console.log('state changed: ', reports.length), [reports]);
  const renderList = () => {
    return (
      <FlatList
        contentContainerStyle={{paddingTop: 10}}
        onEndReached={() => setLoadMore(true)}
        data={reports}
        onEndReachedThreshold={0.2}
        keyExtractor={(item, index) => index + ''}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmptyComponent}
        renderItem={({item}) => (
          <ListItem
            report={item}
            onPress={() => navigation.navigate('detailReport', item.id)}
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
  if (!reports.length)
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
export default Dashboard;
