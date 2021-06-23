/*
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2020-07-15 20:02:57
 * @LastEditors: supan
 * @LastEditTime: 2021-02-25 16:18:20
 */
import axios from 'axios'; //axios 二次封装
import {Message} from 'element-ui'; //cnpm i
import {isArray} from "@/utils";

const axiosInstance = axios.create({});

//axiosInstance.defaults.baseURL = process.env.VUE_APP_API;
axiosInstance.defaults.baseURL = CONFIG.baseURL;// http请求
//拦截http返回
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!error.response) {
        Message.error('网络错误！');
    }
    return Promise.reject(error);
});

axiosInstance.interceptors.request.use(request => {
    if (request.params && request.params.PYM) {
        request.params.PYM = request.params.PYM.toUpperCase();
    }

    if (request.params && request.params.WBM) {
        request.params.WBM = request.params.WBM.toUpperCase();
    }
    return request;
}, (error) => {
    return Promise.reject(error);
});

export default ({
    Vue
}) => {
    Vue.prototype.$axios = axiosInstance;
    Vue.axios = Vue.prototype.$axios;

    var helper = {};
    helper.checkListResponse = (response) => {
        return (
            response &&
            response.data.Data.Total > 0 &&
            isArray(response.data.Data.PageList) &&
            response.data.Data.PageList.length > 0
        );
    };
    helper.checkErrorResponse = (error) => {
        return (
            error &&
            error.response &&
            error.response.data
        );
    };
    helper.errorResponseMsg = (error, errorDef = '操作失败') => {
        if (error && error.response && error.response.data) {
            Message.error({
                message: `${error.response.data.Message}: ${error.response.data.Data}`,
                duration: 0,
                showClose: true
            });
        } else {
           if (typeof(error) == "string") {
                Message.error({
                    message: error,
                    duration: 0,
                    showClose: true
                });
            } 
            else if (typeof(error) == "object") {
                Message.error({
                    message: error.message?error.message:errorDef,
                    duration: 0,
                    showClose: true
                });
            } 
            else {
                Message.error({
                    message: errorDef,
                    duration: 0,
                    showClose: true
                });
            }
        }
    };

    Vue.prototype.$http = helper;
}

export {
    axiosInstance
};