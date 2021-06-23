/*
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2020-07-15 20:02:57
 * @LastEditors: supan
 * @LastEditTime: 2021-02-20 16:21:33
 */
import { clearAllCookie } from "@/api/cookie";
import setRoutes from "@/router/utils";
import { getToken, setToken } from '@/utils';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const whiteList = ['/login'];
//路由守卫
export default ({ router, store, Vue }) => {
    router.beforeEach((to, from, next) => {
        NProgress.start(); //进度条组件
        if (to.query.token) {
            clearAllCookie();
            sessionStorage.clear();
            setToken(to.query.token);
        }

        if (getToken()) {
            if (!store.getters['auth/loggedIn']) {
                store.dispatch('auth/fetch').then(() => {
                    next({ ...to });
                }).catch(() => {
                    store.dispatch('auth/logout').then(() => {
                        next();
                    })
                })
            }
            else if (!store.getters['auth/gotRouters']) {
                store.dispatch('auth/getUserRouters').then(() => {
                    setRoutes({ store, router });     //加载路由的地方
                    next({ ...to, replace: true }); //replace 一个布尔类型，默认为false。如果replace设置为true，那么导航不会留下history记录，点击浏览器回退按钮不会再回到这个路由。
                }).catch((error) => {
                    console.log(error)
                    store.dispatch('auth/logout').then(() => {
                        next();
                    })
                });
            }
            else if (!store.getters['auth/gotModules']) {
                store.dispatch('auth/getUserModules').then(() => {
                    next({ ...to, replace: true });
                }).catch((error) => {
                    store.dispatch('auth/logout').then(() => {
                        next();
                    })
                });
            }
            else if (to.path === '/login') {
                next({ path: '/' });
            }
            else {
                next();
            }
        }
        else {
            if (whiteList.indexOf(to.path) !== -1) {
                next();
            } else {
                next('/login');
            }
        }
    })

    router.afterEach(() => {
        NProgress.done();
    })

    var helper = {}
    helper.loggedIn = () => {
        return store.getters['auth/loggedIn']
    }
    helper.login = (data) => {
        return store.dispatch('auth/login', data)
    }
    helper.logout = () => {
        return store.dispatch('auth/logout')
    }
    helper.fetch = () => {
        return store.dispatch('auth/fetch')
    }
    helper.user = () => {
        return store.getters['auth/user']
    }
    Vue.prototype.$auth = helper
}
