import {useEffect, useReducer} from 'react';
import Axios from 'axios';
export const BASE_URL = 'http://api.kncb.itkv4.com';
function reducer(state, action) {
  switch (action.type) {
    case 'SUCESS':
      return {...state, data: action.payload.result, isLoading: false};
    case 'ERROR':
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
}
export function useFetch(url, initalValue) {
  const [state, dispach] = useReducer(reducer, {
    data: initalValue,
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    Axios.get(BASE_URL + url)
      .then(res => {
        dispach({type: 'SUCESS', payload: res.data});
      })
      .catch(err => {
        dispach({type: 'ERROR', payload: err});
      });
  }, [url]);
  return state;
}
