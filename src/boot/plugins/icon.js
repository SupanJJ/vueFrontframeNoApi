import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; //项目完成时最好统计下需要的图标，按需加载，减少尺寸
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
//https://github.com/FortAwesome/vue-fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, far, fab);

// 百度font-icon
import IconFont from '@/components/IconFont';
import '@/styles/iconfont/iconfont';
//下面这个是导入assets/icon_font下的所有svg文件
const requireAll = reqireContext => reqireContext.keys().map(reqireContext);
/*
 第一个参数是:'./svg' => 需要检索的目录，
 第二个参数是：false => 是否检索子目录,
 第三个参数是: /\.svg$/ => 匹配文件的正则
*/
const req = require.context('@/assets/icon_font', false, /\.svg$/);
requireAll(req);


export default ({ Vue }) => {
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.component('jq-icon', FontAwesomeIcon);
    Vue.component('icon-font', IconFont);
};