export function getRedirectrPath({type, avatar}) {
    let url = (type === 'boss') ? './boss' : './genius';
    if (!avatar) {
        url += 'info';
    }
    return url;
}

export function getChatId(user_id,targetid) {
    return [user_id,targetid].sort().join('_');
}