<template>
    <el-select
        v-model="myValue"
        @change="changeEvent"
        placeholder="请选择输入方式"
        class="input-method-sls"
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
    name: 'InputMethodSelecter',
    components: {},
    props: {
        noCn: {
            type: Boolean,
            default: false
        },
        hasBh: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            myValue: 'PYM'
        }
    },
    created() {
        this.$bus.$on("global-input-method-change", (method) => {
            this.myValue = method;
            if (this.myValue === 'CN' && this.noCn) {
                this.myValue = 'PYM'
            }
        });
    },
    beforeDestroy() {
        this.$bus.$off("global-input-method-change");
    },
    mounted() {
        this.init();
        this.$emit('input', this.myValue);
    },
    methods: {
        init() {
            let globalMethod = this.$store.getters['auth/inputMethod'];

            if (globalMethod === 'CN' && this.noCn) {
                this.myValue = 'PYM'
            }
            else {
                this.myValue = globalMethod ? globalMethod : 'PYM';
            }
        },

        changeEvent(val) {
            this.$emit('change', val);
        },

        changeMethod(method) {
            let isRight = this.inputMethods.some(e => {
                return e.value === method;
            })
            if (isRight) {
                this.myValue = method;
            }
            else {
                console.error("输入法修改错误！只接受'PYM', 'WBM', 'CN'。");
            }
        }
    },
    computed: {
        inputMethods() {
            let methods = [
                {
                    label: "拼",
                    value: 'PYM',
                    name: '拼音码'
                },
                {
                    label: "五",
                    value: 'WBM',
                    name: '五笔码'
                }
            ];

            if (!this.noCn) {
                methods.push({
                    label: "中",
                    value: 'CN',
                    name: '中文'
                });
            }
            if (this.hasBh) {
                methods.push({
                    label: "编",
                    value: 'BH',
                    name: '编号'
                });
            }
            return methods;
        }
    },
    watch: {
        // v-model 对外暴露, 单向传出，无法传入
        // 若想从外部修改输入法，请使用changeMethod方法
        myValue(newVal) {
            this.$emit('input', newVal);
        }
    }
}

</script>

<style lang="scss">
.input-method-sls {
    .el-input__suffix {
        display: none;
    }

    .el-input__inner {
        text-align: center;
        padding-right: 0px !important;
        padding-left: 0px !important;
    }
}
</style>