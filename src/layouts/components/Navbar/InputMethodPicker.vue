<template>
    <el-select
        v-model="currentMethod"
        placeholder="请选择输入方式"
        class="input-method-sls-global"
    >
        <el-option
            v-for="method in inputMethods"
            :key="method.value"
            :label="method.label"
            :value="method.value"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    name: 'InputMethodPicker',
    components: {},
    props: {},
    data() {
        return {
            currentMethod: 'PYM',
            inputMethods: [
                {
                    label: "拼",
                    value: 'PYM',
                    name: '拼音码'
                },
                {
                    label: "五",
                    value: 'WBM',
                    name: '五笔码'
                },
                {
                    label: "汉",
                    value: 'CN',
                    name: '汉字'
                }
            ]
        }
    },
    mounted() { 
        this.currentMethod = this.$store.getters['auth/inputMethod']? this.$store.getters['auth/inputMethod'] : 'PYM';
    },
    methods: {

    },
    computed: {

    },
    watch: {
        currentMethod(newVal) {
            this.$store.dispatch('auth/setUserInputMethod', newVal);
            this.$bus.$emit('global-input-method-change', newVal);
        }
    }
}

</script>

<style lang="scss">
.input-method-sls-global {
    width: 20px;
    .el-input__suffix {
        display: none;
    }

    .el-input__inner {
        border-radius: 0%;
        height: 20px;
        width: 20px;
        font-size: 15px;
        font-weight: bold;
        color: #008ced;
        border: 0px;
        text-align: center;
        padding-right: 0px;
        padding-left: 0px;
    }
}
</style>