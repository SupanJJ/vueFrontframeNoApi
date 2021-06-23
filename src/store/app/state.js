import Cookies from 'js-cookie'
export default {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',
    fixedHeader: true, //一些配置选项，到时候我们放在.env文件里来配置参数
    sidebarLogo: true,
    visitedViews: [],
    cachedViews: []
}