//import Layout from "./views/layout/Layout";
const constantRouterMap = [
    {
        path: "/login",
        component: () => import('@/views/login/index'),
    },
    {
        path: "/404",
        component: () => import('@/views/errors/404'),
    }
];

export default constantRouterMap