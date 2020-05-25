import {PUT_NOTIFICATION_GROUP} from '../constants';

const notificationGroup = (state = [], {type, payload}) => {
  switch (type) {
    case PUT_NOTIFICATION_GROUP:
      return payload;
    default:
      return state;
  }
};
export default notificationGroup;
