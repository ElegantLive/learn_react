import {combineReducers} from 'redux';
import {user} from './redux/user';
import {chatUser} from './redux/chatuser'
import {chat} from './redux/chat'

export default combineReducers({user, chatUser, chat})