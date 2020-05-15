import {combineReducers} from 'redux';
import user from './userReducer';
import popup from './PopupReducer';
import subject from './subjectReducer';
import pendingReport from './pendingReportReducer';
export default combineReducers({user, popup, subject, pendingReport});
