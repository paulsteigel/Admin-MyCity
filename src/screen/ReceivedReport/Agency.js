/** @format */

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {BASE_URL} from '../../service';
import ListItem from './ListItem';
import Axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {MARK_REPORTS_OUTDATED, UPDATE_FWID} from '../../redux/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

function Agency() {
  const navigation = useNavigation();
  const {isDataOutdated} = useSelector(state => state.pendingReport);
  const dispatch = useDispatch();
  const [initalLoad, setInitialLoad] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [reports, setReports] = useState([]);
  const [refreshing, setRefeshing] = useState(false);

  useEffect(() => {
    if (loadMore) loadFeedBack(reports.length);
    if (initalLoad) setInitialLoad(false);
  }, [loadMore]);
  useEffect(() => {
    if (isDataOutdated) {
      loadFeedBack(0);
      dispatch({type: MARK_REPORTS_OUTDATED, payload: {isDataOutdated: false}});
    }
  }, [isDataOutdated]);

  const loadFeedBack = async start => {
    let url = `${BASE_URL}/admin/feedbackforwards/agency/newFeedbackForwards?limit=10&skip=${start}`;
    try {
      let res = await Axios.get(url);
      // console.log('Agency: ', res.data);
      if (!loadMore) setReports(res.data);
      else setReports(prevState => [...prevState, ...res.data]);
    } catch (error) {
      console.log('[Agency] loadfeedback err', error);
    }
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
        keyExtractor={(item, index) => index + ''}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmptyComponent}
        renderItem={({item}) => (
          <ListItem
            report={item}
            onPress={() => {
              navigation.navigate('detailReport', {
                id: item.feedbackId,
                dropdownOptions: [8, 4, 5],
              });
              dispatch({type: UPDATE_FWID, payload: item.id});
            }}
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
        <Text>Không có phản ánh nào</Text>
      </View>
    );
  }
  if (initalLoad)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  return (
    <View style={{flex: 1}}>
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
            Phản ánh cần xử lý
          </Text>
        </View>
      </View>
      {/* end of header */}
      <View style={{flex: 1, paddingHorizontal: 5}}>
        {renderList()}
        <View style={{position: 'relative', width: '100%'}}>
          {loadMore ? (
            <ActivityIndicator
              style={{position: 'absolute', bottom: 20, left: '50%'}}
              size="large"
              color="green"
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
export default Agency;
