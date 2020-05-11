import {OPEN_POPUP, CLOSE_POPUP} from '../constants';

const initialstate = {visible: false, popupTitle: '', height: null};

const PopupReducer = (state = initialstate, {type, payload}) => {
  switch (type) {
    case OPEN_POPUP:
      return {
        ...state,
        visible: true,
        popupTitle: payload.title,
        height: payload.height,
      };
    case CLOSE_POPUP:
      return {...state, visible: false};
    default:
      return state;
  }
};
export default PopupReducer;
