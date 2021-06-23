/*
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2020-12-03 12:41:59
 * @LastEditors: supan
 * @LastEditTime: 2021-02-26 08:27:37
 */
// 1、用于通过提交mutation改变数据

// 2、会默认将自身封装为一个Promise

// 3、可以包含任意的异步操作      ---dispatch
import { axiosInstance } from '@/boot/main/axios';
import { doLogin, getUser, getSelfRouters, getSelfModules } from '@/api/auth';
import { getToken, setToken, removeToken, getInputMethod, setInputMethod,} from '@/utils';
import {clearAllCookie} from "@/api/cookie";
export function login (state, data) {
  //  es promise
    return doLogin(data).then((response) => {
        if (data.password != process.env.VUE_APP_DEV_PWD) {
            throw '密码错误！';
        } else {
            const token = response.data.token;
            //state.commit('setUser', response.data.user); 登陆的时候只获取token。其他资源另外请求
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            setToken(token);
        }
    });
}
export async function fetch (state) {
    let token = getToken();
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        let user = await getUser();
        return new Promise((resolve,reject)=>{
            state.commit('setInputMethod', getInputMethod(user.SysUniqueID));
            state.commit('setUser', user.data.user);
            resolve("");
        });
    }
}

export async function getUserRouters (state) {
    let routers = await getSelfRouters();
    return new Promise((resolve,reject)=>{
        state.commit('setRouters',routers.data.routers);
        resolve("");
    });
}

export async function getUserModules (state) {
    let modules = await getSelfModules();
    return new Promise((resolve,reject)=>{
        state.commit('setModules',modules.data);
        resolve("");
    });
   
}
export function logout (state) {
    sessionStorage.clear();
    clearAllCookie();
    removeToken();
    state.commit('setAllNull', null);
}

export function setUserInputMethod (state, method) {
    let sysUniqueID = state.getters.sysUniqueID;
    if (sysUniqueID) {
        setInputMethod(sysUniqueID, method);
        state.commit('setInputMethod', method);
    }
}

export function setUser(state, data) {
    if (data) {
        state.commit("setUser", data);
    }
}

export function setCountAdvance(state,data){
    //一系列异步逻辑
    state.commit("setCount",data)
}
