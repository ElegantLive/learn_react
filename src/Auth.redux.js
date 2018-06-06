const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export function auth(state = {isAuth: false, user: '卢本伟'}, action) {
    // console.log({...state});
    switch (action.type) {
        case LOGIN:
            return {...state,isAuth:true};
        case LOGOUT:
            return {...state,isAuth:false};
        default:
            return state;
    }
}

export function logout() {
    localStorage.setItem('token',null);
    return {type:LOGOUT}
}
export function login() {
    localStorage.setItem('token','1324');
    return {type:LOGIN}
}