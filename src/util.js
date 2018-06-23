export function getRedirectrPath({type, avatar}) {
    console.log({type, avatar});
    let url = (type === 'boss') ? './boss' : './genius';
    if (!avatar) {
        url += 'info';
    }
    console.log();
    return url;
}