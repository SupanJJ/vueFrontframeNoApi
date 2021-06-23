import Vue from "vue";
import App from "@/App.vue";
import store from "@/store"; //vuex  
import MyRouter from "@/router"; //vue-router
import Boot from "@/boot";

// Style
import '@/styles/index.scss'; // global css

Vue.config.productionTip = false;

// Vue-Router  初始化
var router = MyRouter({ Vue, store });

// Boot
Boot({ Vue, router, store });

// Global Components

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");