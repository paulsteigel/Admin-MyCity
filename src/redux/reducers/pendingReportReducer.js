import {MARK_REPORTS_OUTDATED, NAVIGATE_POP_BACK} from '../constants';

const initialState = {isDataOutdated: false, popBack: 0};
const pendingReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_REPORTS_OUTDATED:
      return {...state, ...action.payload};
    case NAVIGATE_POP_BACK:
      return {...state, popBack: state.popBack + 1};
    default:
      return state;
  }
};
export default pendingReportReducer;
