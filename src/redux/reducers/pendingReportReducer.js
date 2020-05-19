import {MARK_REPORTS_OUTDATED} from '../constants';

const initialState = {isDataOutdated: false};
const pendingReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_REPORTS_OUTDATED:
      return action.payload;
    default:
      return state;
  }
};
export default pendingReportReducer;
