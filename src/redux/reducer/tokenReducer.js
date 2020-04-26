import Axios from 'axios';

const initialState = {
  token: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      Axios.defaults.headers.commons.Authorization = 'Bearer ' + action.payload;
      return {token: action.payload};
    }
    case 'LOGOUT':
      return {token: ''};
    default:
      return state;
  }
};
export default tokenReducer;
