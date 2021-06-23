export default ({ Vue, router }) => {
    Vue.prototype.$bus = new Vue({
        router,
        data: {
            busStore: {},
            config: {
                autoGC: true,
            },
            currentStore: {
                namespace: undefined,
                route: undefined
            }
        },
        watch: {
            $route(to, from) {
                if (to.path != from.path && this.config.autoGC && from.path === this.currentStore.route) {
                    this.destroyNameSpace(this.currentStore.namespace);
                    this.currentStore.namespace = undefined;
                    this.currentStore.route = undefined;
                }
            }
        },
        methods: {
            //在使用临时的存储空间前，需要创建一个命名空间, 
            //也可以通过setVal('namespace/propertyName')直接创建
            createNameSpace(namespace) {
                if (this.busStore[namespace] === undefined) {
                    this.$set(this.busStore, namespace, {});
                    this.currentStore.namespace = namespace;
                    this.currentStore.route = this.$route.path;
                }
            },

            //如果config.autoG未开启，为了优化性能，请在页面路由组件销毁时手动将临时的存储命名空间删除
            //如果config.autoG已经开启，则会进行自动的GC
            destroyNameSpace(namespace) {
                this.$delete(this.busStore, namespace);
            },

            getNameSpaceVal(namespace) {
                if (this.busStore[namespace] === undefined) {
                    console.error('不存在的命名空间！');
                    return undefined;
                }
                else {
                    return this.busStore[namespace];
                }
            },

            setVal(propertyName, val) {
                let nameArr = propertyName.split("/");
                if (nameArr && nameArr.lenght < 2) {
                    console.error('你必须指定一个命名空间！');
                    return false;
                }
                if (this.busStore[nameArr[0]] === undefined) {
                    this.createNameSpace(nameArr[0]);
                }

                if (this.busStore[nameArr[0]][nameArr[1]] === undefined) {
                    this.$set(this.busStore[nameArr[0]], nameArr[1], val);
                }
                else {
                    this.busStore[nameArr[0]][nameArr[1]] = val;
                }
            },

            getVal(propertyName, defVal = undefined) {
                let nameArr = propertyName.split("/");
                if (nameArr && nameArr.lenght < 2) {
                    console.error('你必须指定一个命名空间！');
                    return false;
                }

                if (this.busStore[nameArr[0]] === undefined || this.busStore[nameArr[0]][nameArr[1]] === undefined) {
                    return defVal;
                }
                return this.busStore[nameArr[0]][nameArr[1]];
            },

            delVal(propertyName) {
                let nameArr = propertyName.split("/");
                if (nameArr && nameArr.lenght < 2) {
                    console.error('你必须指定一个命名空间！');
                    return false;
                }

                if (this.busStore[nameArr[0]] === undefined) {
                    console.error('不存在的命名空间！');
                    return false;
                }

                this.$delete(this.busStore[nameArr[0]], nameArr[1]);
            },

            getStore() {
                return this.busStore;
            },
        }
    });
};