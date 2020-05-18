import {
  OPEN_POPUP,
  CLOSE_POPUP,
  OPEN_POPUP_DATA,
  UPDATE_POPUP_DATA,
  OPEN_FORWARD_HISTORY,
} from '../constants';

const initialstate = {
  visible: false,
  popupTitle: '',
  height: null,
  report: {},
  forwardHistory: [],
  hideSubmitButton: false,
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
        hideSubmitButton: false,
      };
    case UPDATE_POPUP_DATA:
      return {...state, hideSubmitButton: false, report: payload};
    case CLOSE_POPUP:
      return {...state, visible: false};
    case OPEN_POPUP_DATA:
      return {...state, hideSubmitButton: false, ...payload, visible: true};
    case OPEN_FORWARD_HISTORY:
      return {
        ...state,
        visible: true,
        popupId: 5,
        popupTitle: 'Lịch sử chuyển phản ánh',
        hideSubmitButton: true,
        ...payload,
      };
    default:
      return state;
  }
};
export default PopupReducer;
