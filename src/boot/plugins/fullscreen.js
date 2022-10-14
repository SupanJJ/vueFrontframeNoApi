import {api as fullscreen} from 'vue-fullscreen'

export default ({ Vue }) => {
    Vue.prototype.$fullscreen = fullscreen;
};
