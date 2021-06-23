import Vue from "vue";
import Vuex from "vuex";

//modules
import app from './app'
import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        auth
    },
    strict: process.env.NODE_ENV !== 'production'
});
