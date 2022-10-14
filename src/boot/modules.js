
//外部模块安装器, 模块放置于public_modules文件夹
import PublicModulesInstall from '%';
import { 

} from '%';

const PublicModules = [

];

export default ({ Vue }) => {
    PublicModulesInstall({ Vue });
    PublicModules.forEach( module => {
        Vue.use(module)
    });
};

