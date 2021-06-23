<!--  -->
<template>
    <div class=''>
        <el-button @click="click">组件二按钮</el-button>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
//这里存放数据
        return {
            
        };
    },
//监听属性 类似于data概念
    computed: {
        countIn2(){
            return this.$store.getters["auth/getCount"];
        }
    },
//监控data中的数据变化
    watch: {},
//方法集合
    methods: {
        click(){
         
          let r = this.countIn2;
          r++;
          this.$store.dispatch("auth/setCountAdvance",r);
          console.log(this.$store.getters["auth/getCount"]);
        }
    },
//生命周期 - 创建完成（可以访问当前this实例）
    created() {
        
    },
//生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //alert(this.countIn2)
    },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>