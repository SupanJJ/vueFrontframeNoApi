<!--  -->
<template>
    <div class=''>
        <span>我是儿子!!---{{countIn1}}</span>
       <el-button @click="click">儿子按钮</el-button>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
name:'',
    components: {},
    props:{
       message:{
           type:String,
           default:''
       }
    },
    data() {
//这里存放数据
        return {
        };
    },
//监听属性 类似于data概念
    computed: {
        countIn1(){
            return  this.$store.getters["auth/getCount"];
        }
    },
//监控data中的数据变化
    watch: {},
//方法集合
    methods: {
        childMethod(){
            alert('child')
            //this.$parent
        },
        click(){
            //逻辑处理 父子组件
            this.$emit("tell",1,2,3)
            //页面 不一定父子
            this.$bus.$emit("allTell",'我来了');
        }
    },
//生命周期 - 创建完成（可以访问当前this实例）
    created() {
        
    },
//生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
     
    },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
