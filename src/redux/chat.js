import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatMsg: [],
    user: {},
    unread: 0
};

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                user: action.payload.user,
                chatMsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => (!v.is_read && v.to === action.payload.userId)).length
            };
        case MSG_RECV:
            const unread = (action.payload.msgs.to === action.payload.userId) ? 1 : 0;
            return {...state, chatMsg: [...state.chatMsg, action.payload.msgs], unread: state.unread + unread};
        case MSG_READ:
            return null;
        default:
            return state;
    }
}

function msgRecv(msgs, userId) {
    return {type: MSG_RECV, payload: {msgs, userId}}
}

function msgList(msgs, user, userId) {
    return {type: MSG_LIST, payload: {msgs, user, userId}}
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function (data) {
            const user_id = getState().user._id;
            dispatch(msgRecv(data, user_id))
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

export function getMsgList() {
    const user_id = localStorage.getItem('user_id');
    return dispatch => {
        axios.get('user/getmsglist', {params: {user_id: user_id}})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.data, res.data.user, user_id))
                }
            })
    }
}
