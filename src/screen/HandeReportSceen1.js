/** @format */

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {BASE_URL} from '../service';
import Axios from 'axios';
import HandledCard from '../components/HandledCard';
import {useDispatch} from 'react-redux';
import {
  OPEN_LOADING_MODAL,
  CLOSE_LOADING_MODAL,
  OPEN_POPUP_DATA,
  OPEN_FORWARD_HISTORY,
  UPDATE_POPUP_DATA,
  UPDATE_FWID,
} from '../redux/constants';
const {width, height} = Dimensions.get('window');
function HandleReportScreen1({navigation, ...props}) {
  const [loadMore, setLoadMore] = useState(true);
  const [refreshing, setRefeshing] = useState(false);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    if (loadMore) loadFeedBack(reports.length);
  }, [loadMore]);

  const dispatch = useDispatch();
  const loadFeedBack = async start => {
    try {
      let url = `${BASE_URL}/admin/feedbackforwards/department/newFeedbackForwards?limit=10&skip=${start}`;
      let res = await Axios.get(url);

      if (!loadMore) setReports(res.data);
      else setReports(prevState => [...prevState, ...res.data]);
      setLoadMore(false);
      setRefeshing(false);
    } catch (err) {
      console.log('sceen1: ', err);
    }
  };
  const handleRefresh = () => {
    setRefeshing(true);
    loadFeedBack(0);
  };
  const handleReport = async (feedbackId, id) => {
    try {
      dispatch({type: OPEN_LOADING_MODAL, payload: 'loading'});
      const res = await Axios.get(`${BASE_URL}/admin/feedbacks/${feedbackId}`);
      dispatch({type: UPDATE_FWID, payload: id});
      dispatch({
        type: OPEN_POPUP_DATA,
        payload: {report: res.data, popupId: 6, popupTitle: 'Xử lý phản ánh'},
      });
    } catch (error) {
      Toast.show('Có lỗi xảy ra');
    } finally {
      dispatch({type: CLOSE_LOADING_MODAL});
    }
  };

  const viewForwardHistory = async id => {
    try {
      dispatch({type: OPEN_LOADING_MODAL, payload: 'loading'});
      const res = await Axios.get(`${BASE_URL}/fbfw/${id}`);

      dispatch({
        type: OPEN_FORWARD_HISTORY,
        payload: {forwardHistory: res.data, height: height / 2},
      });
    } catch (error) {
      Toast.show('Có lỗi xảy ra');
    } finally {
      dispatch({type: CLOSE_LOADING_MODAL});
    }
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
            viewForwardHistory={viewForwardHistory}
            item={item}
            handleable={true}
            handleReport={handleReport}
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
export default HandleReportScreen1;
