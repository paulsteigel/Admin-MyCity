import {OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL} from '../constants';
const initalState = {visible: false, text: ''};
const loadingModalReducer = (state = initalState, {type, payload}) => {
  switch (type) {
    case OPEN_LOADING_MODAL:
      return {...state, visible: true, text: payload};
    case CLOSE_LOADING_MODAL:
      return {...state, visible: false};
    default:
      return state;
  }
};
export default loadingModalReducer;
