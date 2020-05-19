import {LOGIN, LOGOUT, LOADING_DONE} from '../constants';
const initialState = {
  isLoading: true,
  user: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload};
    case LOGOUT:
      return {...state, user: null};
    case LOADING_DONE:
      return {...state, isLoading: false};
    default:
      return state;
  }
};
export default userReducer;
