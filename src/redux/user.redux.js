import axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    msg: '',
    isAuth: false,
    user: '',
    pwd: '',
    type: ''
};

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        default:
            return state;
    }
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG};
}


export function userRegister({user, pwd, repeatPwd, type}) {
    if (!user || !pwd) return errorMsg('用户名密码必须输入');

    if (pwd !== repeatPwd) return errorMsg('两次输入密码不一致');

    axios.post('/user/register', {user, pwd, type})
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                registerSuccess({user, pwd, type})
            } else {
                errorMsg(res.data.msg)
            }
        });

    // axios.get('/user/list',{})
    //     .then(res => {
    //         if (res.status === 200 && res.data.code === 0) {
    //             registerSuccess({user, pwd, type})
    //         } else {
    //             errorMsg(res.data.msg)
    //         }
    //     })
}