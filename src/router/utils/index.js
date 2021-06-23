const _import = require('./_import_' + process.env.NODE_ENV);
import { deepCopy } from '@/utils';

export function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            route.component = _import(route.component);
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })

    return accessedRouters
}

export default ({ store, router }) => {
    let rawData = deepCopy(store.getters['auth/myRouters']);
    let routersData = filterAsyncRouter(rawData);
    routersData.push({ path: '*', redirect: '/404' }); //页面未匹配到
    router.addRoutes(routersData);
    router.options.routes = store.getters['auth/myRouters'];
}
