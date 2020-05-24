import {LOGIN, LOGOUT, ONREGISTER_FIREBASE, LOADING_DONE} from '../constants';
const initialState = {
  isLoading: true,
  user: null,
  firebaseToken: '',
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload};
    case LOGOUT:
      return {...state, user: null};
    case LOADING_DONE:
      return {...state, isLoading: false};
    case ONREGISTER_FIREBASE:
      return {...state, firebaseToken: action.payload};
    default:
      return state;
  }
};
export default userReducer;
