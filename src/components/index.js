import NameSearchInput from './NameSearchInput';

// 需要注册的全局组件
const components = [
    {
        name: 'name-search-input',
        component: NameSearchInput
    }
];

export default function(Vue) {
    components.forEach( item => {
        Vue.component(item.name, item.component);
    })
}