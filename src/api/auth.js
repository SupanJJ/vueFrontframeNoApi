/*
 * 该模块用于用户的登陆与相关用户信息的获取
 * 非资源类API
 */
import {
    axiosInstance
} from '@/boot/main/axios';

let selfUrl = `${window.location.protocol}//${window.location.host}`;

export function doLogin(data) {
    return axiosInstance.get(`${selfUrl}/mock/token.json?` + new Date().getTime());
    //return axiosInstance.get(`${process.env.VUE_APP_DEVELOP_URL}/mock/token.json?` + new Date().getTime());
}

export function getUser(data) {
    return axiosInstance.get(`${selfUrl}/mock/user.json?` + new Date().getTime());
}

export function getSelfRouters() {
    return axiosInstance.get(`${selfUrl}/mock/routers.json?` + new Date().getTime());
}

export function getSelfModules() {
    return axiosInstance.get(`${selfUrl}/mock/modules.json?` + new Date().getTime());
}

//获取应用信息，无须Token
export function getAppInfo(appId) {
    return axiosInstance({
        url: `/login/app/${appId}`,
        method: "get"
    });
}