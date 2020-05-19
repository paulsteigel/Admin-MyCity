import {OPEN_ERROR_POPUP, CLOSE_ERROR_POPUP} from '../constants';
const initalState = false;
const errorReducer = (state = initalState, {type, payload}) => {
  switch (type) {
    case OPEN_ERROR_POPUP:
      return true;
    case CLOSE_ERROR_POPUP:
      return false;
    default:
      return state;
  }
};
export default errorReducer;
