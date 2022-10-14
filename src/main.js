import Vue from "vue";
import App from "@/App.vue";
import store from "@/store"; //vuex  
import MyRouter from "@/router"; //vue-router
import Boot from "@/boot";
import GlobalComponents from "@/components";
// Style
import '@/styles/index.scss'; // global css

Vue.config.productionTip = false;


import i18n from '@/boot/plugins/i18n'
// Vue-Router  初始化
var router = MyRouter({ Vue, store });

// Boot
Boot({ Vue, router, store });
GlobalComponents(Vue);
// Global Components

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");