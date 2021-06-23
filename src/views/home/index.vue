<!--
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2021-02-25 15:54:55
 * @LastEditors: supan
 * @LastEditTime: 2021-02-25 17:09:25
-->
<template>
    <div class="app-container">
       <child-first ref="childComp" :message='fathermsg'  @tell="tellfather"/>
       <br/>
        <child-second/>
       <el-button @click="click"> 我是父组件按钮</el-button>
        <!-- <side-tags
            :labels="['标签1', '标签2', '标签3']"
            :hover-expand="false"
        >
            <span slot="标签1">
                标签1
            </span>
            <span slot="标签2">
                标签2
            </span>
            <span slot="标签3">
                标签3
            </span>
        </side-tags> -->
         <el-button @click="click2">跳转</el-button>
    </div>
</template>

<script>
import SideTags from '@/components/SideTags';
import StandardTablePage from "@/templates/StandardTablePage";
import ChildFirst from '@/components/ChildFirst';
import ChildSecond from '@/components/ChildSecond'
export default {
    name: '',
    components: {
        SideTags,
        StandardTablePage, //大写驼峰     standard-table-page
        ChildFirst,
        ChildSecond
    },
    props: {

    },
    created(){
       this.$bus.$on("allTell",this.notice);
    },
    beforeCreate(){
        this.$bus.$off("allTell",this.notice);
    },
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i}`,
                    disabled: i % 4 === 0
                });
            }
            return data;
        };
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            data: generateData(),
            value: [1, 4],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            fathermsg:'我是爸爸变量',
        

        }
    },
    mounted() {
       console.log(this.$auth.user())
     },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleSelectionChange(val){
         console.log(val)
        },
        click(){
            console.log(this.$refs.childComp)
         this.$refs.childComp.childMethod();
        },
        tellfather(param1,param2,param3,param4){
           alert("我再父亲里")

        },
        notice(all){
           alert(all)
        },
        click2(){
             
        }
    },
    computed: {},
}

</script>

<style>
</style>