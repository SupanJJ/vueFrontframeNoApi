<template>
    <div class="app-container">
        <el-row>
            <el-card
                class="filter-container"
                shadow="never"
            >
                <slot name="filter-header"></slot>
                <slot name="filter-body"></slot>
            </el-card>
        </el-row>
        <el-row
            :gutter="15"
            style="margin-top:15px"
        >
            <el-col
                :sm="6"
                :md="6"
            >
                <slot
                    name="tree-component"
                ></slot>
            </el-col>
            <el-col
                :sm="18"
                :md="18"
            >
                <slot
                    name="table-component"
                ></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: "StandardTreeTablePage",
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { }
};
</script>
<style scoped>
    .icon-space {
        margin-left: 5px;
    }
</style>