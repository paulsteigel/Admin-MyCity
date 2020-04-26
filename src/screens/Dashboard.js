import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';
import {useFetch} from '../services';
import ListItem from '../components/ListItem';

const {width} = Dimensions.get('window');
const Dashboard = ({navigation}) => {
  const feedback = useFetch('/findallfeedback', []);
  const listEmptyComponent = () => <Text>Hiện chưa có phản ánh nào</Text>;
  return (
    <>
      <Header />
      <FlatList
        data={feedback.data}
        // onEndReached={({distanceFromEnd}) => getMoreReport()}
        // onEndReachedThreshold={0.2}
        keyExtractor={item => item.createdAt}
        ListEmptyComponent={listEmptyComponent}
        // showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ListItem
            report={item}
            onPress={() => navigation.navigate('detailReport', item)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{width: width, height: 10}} />
        )}
      />
    </>
  );
};
export default Dashboard;
