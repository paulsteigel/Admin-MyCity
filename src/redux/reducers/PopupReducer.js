import {OPEN_POPUP, CLOSE_POPUP} from '../constants';

const initialstate = {visible: false, popupTitle: ''};

const PopupReducer = (state = initialstate, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return {...state, visible: true, popupTitle: action.payload.title};
    case CLOSE_POPUP:
      return {...state, visible: false};
    default:
      return state;
  }
};
export default PopupReducer;
