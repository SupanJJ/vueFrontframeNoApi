# JQ.HIS2.0.Base

## 项目初始化
```
npm install
```
建议使用，提升下载速度
```
cnpm install
```

### 编译并运行（开发环境）
```
npm run serve
```

### 打包成生产文件（生产环境）
```
npm run build
```

### 语法检查（暂时无用）
```
npm run lint
```


## 目录结构
```
src
├── main.js #项目入口文件
├── App.vue 
├── api #后端API
│   └── auth.js
├── assets #静态资源
│   └── logo.png
├── boot #项目启动插件
│   ├── index.js
│   ├── main #主要插件
│   │   ├── auth.js
│   │   ├── axios.js
│   │   └── element.js
│   └── plugins #可选插件
│       ├── bus.js
│       └── icon.js
├── components #公共组件注册
│   └── index.js
├── data #数据和数据结构（类似于model）
│   └── default #默认数据结构
│       └── example1.js
├── layouts #页面布局
│   └── Layout.vue
├── router #vue-router
│   ├── index.js
│   └── routes.js
├── store #vuex
│   ├── app
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutations.js
│   │   └── state.js
│   ├── auth
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutations.js
│   │   └── state.js
│   └── index.js
└── views #页面
    ├── errors
    │   └── 404.vue
    ├── example
    │   ├── example1
    │   │   └── index.vue
    │   └── example2
    │       └── index.vue
    ├── home
    │   └── index.vue
    ├── login
    │   └── index.vue
    └── user
        └── index.vue
```