export function user(state) {
    return state.user;
}

export function username(state) {
    if (state.user && state.user.UserName) {
        return state.user.UserName;
    } else {
        return "未知用户";
    }
}

export function sysUniqueID(state) {
    if (state.user && state.user.SysUniqueID) {
        return state.user.SysUniqueID;
    } else {
        return '';
    }
}

export function inputMethod(state) {
    return state.inputMethod;
}

export function myRouters(state) {
    return state.routers;
}

export function myModules(state) {
    return state.modules;
}


/**
 * 以下为信息是否获取到的判断
 */
export function loggedIn(state) {
    return (state.user !== null);
}

export function gotRouters(state) {
    return (state.routers !== null);
}

export function gotModules(state) {
    return (
        state.modules !== null &&
        typeof state.modules === typeof [] &&
        state.modules.length > 0
    );
}

export function getCount(state){
    return state.count;
}