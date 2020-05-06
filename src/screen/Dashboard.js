/** @format */

import React, {Component, useReducer, useState, useEffect} from 'react';
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

const width = Dimensions.get('window').width;

function Dashboard({navigation, ...props}) {
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [reports, setReport] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/admin/feedbacks/pendingFeedbacks`)
      .then(res => {
        setReport(res.data);
        // console.log('data: ', res.data);
      })
      .catch(err => {
        console.log('[PENDING REPORT] err:', JSON.stringify(err));
      });
  }, []);
  const renderList = () => {
    return (
      <FlatList
        data={reports}
        onEndReachedThreshold={0.2}
        keyExtractor={(item, index) => index + ''}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ListItem
            report={item}
            onPress={() => navigation.navigate('detailReport', item.id)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{width: width, height: 10}} />
        )}
        // refreshing={this.state.refreshing}
        // onRefresh={this.handleRefresh}
      />
    );
  };
  function renderNoItem() {
    return (
      <View>
        <Text>No iTem</Text>
      </View>
    );
  }
  if (loading)
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
