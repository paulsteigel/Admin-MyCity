import {combineReducers} from 'redux';
import user from './userReducer';
import popup from './PopupReducer';
export default combineReducers({user, popup});
