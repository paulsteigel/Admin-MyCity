import {GET_SUBJECTS} from '../constants';

const subjectReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SUBJECTS:
      return action.payload;
    default:
      return state;
  }
};
export default subjectReducer;
