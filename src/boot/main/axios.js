import axios from 'axios'; //axios 二次封装
import { Message } from 'element-ui'; //cnpm i
import { isArray } from "%/utils";
const axiosInstance = axios.create({});
//axiosInstance.defaults.baseURL = process.env.VUE_APP_API;
axiosInstance.defaults.baseURL = CONFIG.baseURL;// http请求
//拦截http返回
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (err) => {
    // if (err.message == "interrupt") {
    //     return Promise.resolve("interrupt");
    // }
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误'
                break
            case 401:
                err.message = '未授权，请登录'
                break
            case 403:
                err.message = '拒绝访问'
                break
            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break
            case 408:
                err.message = '请求超时'
                break
            case 500:
                err.message = '服务器内部错误'
                break
            case 501:
                err.message = '服务未实现'
                break
            case 502:
                err.message = '网关错误'
                break
            case 503:
                err.message = '服务不可用'
                break
            case 504:
                err.message = '网关超时'
                break
            case 505:
                err.message = 'HTTP版本不受支持'
                break
            default:

        }
    }
    return Promise.reject(err);
});

axiosInstance.interceptors.request.use(request => {
    if (request.params && request.params.pym) {
        request.params.pym = request.params.pym.toUpperCase();
    }

    if (request.params && request.params.wbm) {
        request.params.wbm = request.params.wbm.toUpperCase();
    }
    // request.cancelToken = new axios.CancelToken(cancel => {
    //     //强行中断请求要用到的
    //     store.commit("auth/addHttpRequestList", cancel);
    // });
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
    helper.errorResponseMsg = (error,duration=0, errorDef = '操作失败') => {
        if (error && error.response) {
            Message.error({
                message: `${error.message}:${error.response.data.message}`,
                duration: duration,
                showClose: true,
                customClass: "max-zIndex-poppover"
            });
        } else if (error && error.message) {
            Message.error({
                message: `${error.message}`,
                duration: duration,
                showClose: true,
                customClass: "max-zIndex-poppover"
            });
        }
        else {
            if (typeof (error) == "string") {
                Message.error({
                    message: error,
                    duration: duration,
                    showClose: true,
                    customClass: "max-zIndex-poppover"
                });
            }
            else if (typeof (error) == "object") {
                Message.error({
                    message: error.message ? error.message : errorDef,
                    duration: duration,
                    showClose: true,
                    customClass: "max-zIndex-poppover"
                });
            }
            else {
                Message.error({
                    message: errorDef,
                    duration: duration,
                    showClose: true,
                    customClass: "max-zIndex-poppover"
                });
            }
        }
    };

    Vue.prototype.$http = helper;
}

export {
    axiosInstance
};