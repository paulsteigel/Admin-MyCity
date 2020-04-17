const initialState = '';

const token = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      console.log(action);
      return '';
    default:
      return state;
  }
};
export default token;
