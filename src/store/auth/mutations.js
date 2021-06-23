/*
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2021-02-25 15:54:55
 * @LastEditors: supan
 * @LastEditTime: 2021-02-25 16:06:00
 */

// 1、通过提交commit改变数据

// 2、只是一个单纯的函数

// 3、不要使用异步操作，异步操作会导致变量不能追踪     --commit

import constantRoutes from "@/router/routes";

export function setAllNull (state, data) {
    for (const key in state) {
        state[key] = null
    }
}

export function setUser (state, data) {
    state.user = data;
    if (data && data.Depts && data.Depts.length === 1) {
        state.currentDept = data.Depts[0];
    }
}
export function setInputMethod (state, data) {
    state.inputMethod = data
}

export function setRouters (state, data) {
    state.routers = constantRoutes.concat(data);
}

export function setModules (state, data) {
    state.modules = data
}

export function setCount(state,data){
    state.count = data;
}
