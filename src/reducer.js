import {combineReducers} from 'redux';
import {user} from './redux/user.redux';
import {chatUser} from './redux/chatuser'

export default combineReducers({user,chatUser})