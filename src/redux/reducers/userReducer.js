import {LOGIN, LOGOUT} from '../constants';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
export default userReducer;
