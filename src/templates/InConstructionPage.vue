<!--  -->
<template>
    <div
        class='in-construction-page-div'
        :style="`background-image: url(${backgroundImg});`"
    >

    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import backgroundImg from "@/assets/inconstruction.jpg";
export default {
    name: "",
    props: {},
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            backgroundImg
        };
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.in-construction-page-div {
    height: 100%;
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #ebebeb;
}
</style>