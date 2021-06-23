/*
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2021-02-25 15:54:55
 * @LastEditors: supan
 * @LastEditTime: 2021-02-25 16:02:37
 */
import Router from "vue-router";
import constantRouterMap from "./routes"

export default ({ Vue, store }) => {
    Vue.use(Router);

    let myRouter = new Router({
        mode: "history", //后端支持可启用
        scrollBehavior: () => ({ x: 0, y: 0 }),
        base: process.env.BASE_URL,
        routes: constantRouterMap      //404  login
    });

    //replace方法改造，替换TagsView
    myRouter.replace = (location, onComplete, onAbort) => {
        store.dispatch('app/delView', myRouter.history.current);
        myRouter.history.replace(location, onComplete, onAbort);
    }

    //push方法改造，替换TagsView
    myRouter.push = (location, onComplete, onAbort) => {
        if (typeof location === 'object' && location.replace) {
            store.dispatch('app/delView', myRouter.history.current);
        }
        myRouter.history.push(location, onComplete, onAbort);
    }

    return myRouter;
};