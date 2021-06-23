/**
 * storage操作
 */

//#region token
const TOKEN_KEY = process.env.VUE_APP_TOKEN_KEY_NAME;

export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    return sessionStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
    return sessionStorage.removeItem(TOKEN_KEY);
}
//#endregion

//#region 输入法
const INPUT_METHOD_KEY = 'input-method';

export function getInputMethod(sysUniqueID) {
    return localStorage.getItem(`${INPUT_METHOD_KEY}-${sysUniqueID}`);
}

export function setInputMethod(sysUniqueID, inputMethod) {
    return localStorage.setItem(`${INPUT_METHOD_KEY}-${sysUniqueID}`, inputMethod);
}
//#endregion

//#region 默认科室
const DEFAULT_DEPT = 'current-dept';

export function getCurrentDept(sysUniqueID) {
    return localStorage.getItem(`${DEFAULT_DEPT}-${sysUniqueID}-${getOrgCode()}`);
}

export function setCurrentDept(sysUniqueID, dept) {
    return localStorage.setItem(`${DEFAULT_DEPT}-${sysUniqueID}-${getOrgCode()}`, JSON.stringify(dept));
}
//#endregion

//#region 默认窗口
const DEFAULT_WINDOW = 'current-window';

export function getCurrentWindow(sysUniqueID) {
    return localStorage.getItem(`${DEFAULT_WINDOW}-${sysUniqueID}`);
}

export function setCurrentWindow(sysUniqueID, window) {
    return localStorage.setItem(`${DEFAULT_WINDOW}-${sysUniqueID}`, JSON.stringify(window));
}
//#endregion

//#region 登录用户ID
const LOGIN_KEY = 'login-user';

export function getLoginUser() {
    return sessionStorage.getItem(LOGIN_KEY);
}

export function setLoginUser(data) {
    return sessionStorage.setItem(LOGIN_KEY, data);
}

export function removeLoginUser() {
    return sessionStorage.removeItem(LOGIN_KEY);
}
//#endregion

//#region 登录参数
const ORGTOKEN_KEY = 'org-token';

export function getOrgToken() {
    return sessionStorage.getItem(ORGTOKEN_KEY);
}

export function setOrgToken(data) {
    return sessionStorage.setItem(ORGTOKEN_KEY, data);
}

export function removeOrgToken() {
    return sessionStorage.removeItem(ORGTOKEN_KEY);
}

const ORGCODE_KEY = 'org-code';

export function getOrgCode() {
    return sessionStorage.getItem(ORGCODE_KEY);
}

export function setOrgCode(data) {
    return sessionStorage.setItem(ORGCODE_KEY, data);
}

export function removeOrgCode() {
    return sessionStorage.removeItem(ORGCODE_KEY);
}
//#endregion

//#region 登录参数
const ORGPARAMS_KEY = 'org-params';

export function getOrgParams() {
    return sessionStorage.getItem(ORGPARAMS_KEY);
}

export function setOrgParams(data) {
    return sessionStorage.setItem(ORGPARAMS_KEY, data);
}

export function removeOrgParams() {
    return sessionStorage.removeItem(ORGPARAMS_KEY);
}
//#endregion