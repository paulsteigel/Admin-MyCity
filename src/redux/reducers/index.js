import {combineReducers} from 'redux';
import user from './userReducer';
import popup from './PopupReducer';
import subject from './subjectReducer';
import pendingReport from './pendingReportReducer';
import loadingModal from './LoadingModalReducer';
import errorPopup from './errorReducer';
export default combineReducers({
  user,
  popup,
  loadingModal,
  subject,
  pendingReport,
  errorPopup,
});
