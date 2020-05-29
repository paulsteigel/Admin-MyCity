import {
  OPEN_POPUP,
  CLOSE_POPUP,
  OPEN_POPUP_DATA,
  UPDATE_POPUP_DATA,
  UPDATE_FWID,
} from '../constants';

const initialstate = {
  visible: false,
  popupTitle: '',
  height: null,
  report: {},
  fwid: null,
  url: '',
  fromScreen: '',
};

const PopupReducer = (state = initialstate, {type, payload}) => {
  switch (type) {
    case OPEN_POPUP:
      return {
        ...state,
        visible: true,
        popupId: payload.id,
        popupTitle: payload.title,
        height: payload.height,
        url: payload.url,
        fromScreen: payload.fromScreen,
      };
    case UPDATE_POPUP_DATA:
      return {...state, report: payload};
    case CLOSE_POPUP:
      return {...state, visible: false};
    case OPEN_POPUP_DATA:
      return {...state, ...payload, visible: true};
    case UPDATE_FWID:
      return {
        ...state,
        fwid: payload,
      };
    default:
      return state;
  }
};
export default PopupReducer;
