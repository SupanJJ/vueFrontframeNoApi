import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; //项目完成时最好统计下需要的图标，按需加载，减少尺寸
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//https://github.com/FortAwesome/vue-fontawesome

library.add(fas, far, fab);

export default ({ Vue }) => {
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.component('jq-icon', FontAwesomeIcon);
};