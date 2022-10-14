<!-- 烟花组件 -->
<template>
    <div class="fireworks-container" id="fireworks-container" @click="stop">
        <div class="title">
            <div :class="type == 3 ? 'fire' : 'shine'">{{ title }}</div>
        </div>
        <el-button
            type="text"
            style="
                color: #fff;
                position: fixed;
                bottom: 20px;
                right: 20px;
                font-size: 30px;
            "
            @click="close"
            v-throttle="2000"
            >关 闭</el-button
        >
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Fireworks } from "fireworks-js";
export default {
    name: "",
    props: {
        title: {
            type: String,
            default: "",
        },
        type: {
            type: Number,
            default: 1, //1 生日 2 入职纪念日  3 阀点   4 生日+入职纪念日
        },
        milstoneCelebrates: {
            type: Array,
            default: () => [],
        },
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            fireworks: null,
            state: 0,
            enter_time: "",
            leave_time: "",
        };
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.enter_time = Date.now();
        const container = document.getElementById("fireworks-container");
        this.fireworks = new Fireworks(container, {
            /* options */
        });
        this.fireworks.start();
    },
    //方法集合
    methods: {
        stop() {
            this.fireworks.clear();
        },
        async close() {
            this.$emit("close");
        },
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.fireworks-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    z-index: 99999999;
    .title {
        font-size: 55px; /*设置字体大小*/
        font-weight: bold; /*设置字体粗细*/
        font-family: "微软雅黑"; /*设置字体*/
        background: #000; /*设置页面背景颜色*/
        color: #fff; /*设置文字颜色*/
        text-align: center; /*设置文字居中*/
        position: fixed;
        top: 25%;
        margin: 0 50px;
        width: calc(100% - 100px);
    }
    .fire {
        text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85,
            -20px -20px 40px #ffae34, 20px -40px 50px #ec760c,
            0 -80px 70px #f38e1c; /*设置文字阴影*/
        -webkit-animation: flame 2s infinite; /*设置动画*/
    }

    @-webkit-keyframes flame {
        /*创建动画*/
        0% {
            text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85,
                -20px -20px 40px #ffae34, 20px -40px 50px #ec760c,
                0 -80px 70px #f38e1c;
        }
        30% {
            text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85,
                -20px -20px 40px #ffae34, 20px -40px 50px #ec760c,
                10px -90px 80px #f38e1c;
        }
        60% {
            text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85,
                -20px -20px 40px #ffae34, 20px -40px 50px #ec760c,
                0px -80px 100px #f38e1c;
        }
        100% {
            text-shadow: 0 0 20px #fefcc9, 10px -10px 30px #feec85,
                -20px -20px 40px #ffae34, 20px -40px 50px #ec760c,
                0 -80px 70px #f38e1c;
        }
    }
    .shine {
        font-family: "Microsoft YaHei";
        font-size: 55px;
        text-align: center;
        background: -webkit-linear-gradient(left, #0f0, #00f) 0 0 no-repeat; /*设置线性渐变*/
        -webkit-background-size: 160px; /*设置背景大小*/
        -webkit-background-clip: text; /*背景被裁剪到文字*/
        -webkit-text-fill-color: rgba(
            255,
            255,
            255,
            0.5
        ); /*设置文字的填充颜色*/
        -webkit-animation: shine 5s infinite; /*设置动画*/
    }
    @-webkit-keyframes shine {
        /*创建动画*/
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 100%;
        }
    }
}
</style>
