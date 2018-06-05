const ADD = '关注';
const UNFOLLOW = '取关';


export function counter
(state = 0, action) {
    switch (action.type) {
        case ADD:
            return state + 1;
        case UNFOLLOW:
            return state - 1;
        default:
            return state;
    }
}

export  function add() {
    return {type:ADD};
}


export  function unfollow() {
    return {type:UNFOLLOW};
}

export function addAsync() {
    return dispath=>{
        setTimeout(()=>{
            dispath(add());
        },2000)
    }
}