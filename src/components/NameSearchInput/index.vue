<template>
    <el-input
        v-model="myValue"
        ref="innerInput"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :size="size"
        @blur="blurEvent"
        @focus="focusEvent"
        @change="changeEvent"
        @keyup.enter.native="searchBtnClickEvent"
    >
        <input-method-selecter
            v-model="inputMethod"
            :has-bh="hasBh"
            slot="prepend"
        />
        <el-button
            v-if="searchBtn"
            slot="append"
            icon="el-icon-search"
            @click="searchBtnClickEvent"
        ></el-button>
    </el-input>
</template>

<script>
import InputMethodSelecter from '../InputMethodSelecter';

export default {
    name: 'NameSearchInput',
    components: {
        InputMethodSelecter
    },
    props: {
        //原生属性
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入关键字'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'mini'
        },
        searchBtn: {
            type: Boolean,
            default: false
        },
        hasBh:{
            type: Boolean,
            default: false
        },
        //业务属性
        pymModel: {
            type: String,
            default: ''
        },
        wbmModel: {
            type: String,
            default: ''
        },
        cnModel: {
            type: String,
            default: ''
        },
        bhModel: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            myValue: '',
            inputMethod: ''
        }
    },
    mounted() {
    },
    methods: {
        blurEvent(e) {
            this.$emit('blur', e);
        },

        focusEvent(e) {
            this.$emit('focus', e);
        },
        focus(){
            this.$refs.innerInput.focus();
        },
        select(){
            this.$refs.innerInput.select();
        },
        blur(){
            this.$refs.innerInput.blur();
        },
        changeEvent(val) {
            this.$emit('change', val);
            this.changeField();
        },

        searchBtnClickEvent() {
            this.$emit('search-btn-click');
        },

        changeField() {
            let model = `${this.inputMethod.toLowerCase()}-model`;
            let bindModels = ['pym-model', 'wbm-model', 'cn-model','bh-model'];
            let index = bindModels.indexOf(model);
            if (index > -1) {
                bindModels.splice(index, 1);
            }

            this.$emit(`update:${model}`, this.myValue);
            bindModels.forEach(e => {
                this.$emit(`update:${e}`, '');
            });
        }
    },
    computed: {
        emptyValue() {
            return !this.pymModel && !this.wbmModel && !this.cnModel && !this.bhModel;
        }
    },
    watch: {
        // v-model 对外暴露
        value(newVal) {
            this.myValue = newVal;
        },
        myValue(newVal) {
            this.$emit('input', newVal);
            this.changeField();
        },

        //由于直接事件比watch快，所以需要用watch来监控
        inputMethod() {
            this.changeField();
        },

        emptyValue(newVal) {
            if (newVal) {
                this.myValue = '';
            }
        }
    }
}

</script>

<style lang="scss">
.sls-prepend {
    .el-input__suffix {
        display: none;
    }

    .el-input__inner {
        text-align: center !important;
        padding-right: 0px !important;
        padding-left: 0px !important;
    }
}
</style>