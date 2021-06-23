<template>
    <div class="app-container">
        <el-card
            class="filter-container mini-mb"
            v-if="isFilter"
            v-show='showFilter'
        >
            <slot name="filter-header">   
            </slot>
            <slot name="filter-body">
            </slot>
            <slot name="filter-footer">

            </slot>
        </el-card>

        <el-card
            class="operate-container"
            v-if="isOperate"
        >
            <slot name="operate-header">
                <div>
                    <slot name="operate-header-title">
                        <!-- <jq-icon icon="table"></jq-icon>
                        <span class="icon-space">列表操作</span> -->
                    </slot>
                    <span class="to-right">
                        <slot name="operate-header-active">

                        </slot>
                    </span>
                </div>
            </slot>
            <slot name="operate-body">

            </slot>
            <slot name="operate-footer">

            </slot>
        </el-card>

        <el-row :gutter="10">
            <el-col v-if="isTree" :span="treeCol">
                <el-card class="no-p" style="min-height: 265px">
                    <div slot="header">
                        <slot name="tree-header">
                            <h3 class="title-left no-mt no-mb">
                                选择树
                            </h3>
                        </slot>
                    </div>
                    <slot name="tree-body">

                    </slot>
                    <slot name="tree-footer">

                    </slot>
                </el-card>
            </el-col>

            <el-col v-if="isTable" :span="tableCol">
                <el-card class="no-p">
                    <div v-if="isTableHeader" slot="header">
                        <slot name="table-header">
                            <h3 class="title-left no-mt no-mb">
                                数据列表
                            </h3>
                        </slot>
                    </div>

                    <slot name="table-body">

                    </slot>
                    <slot name="table-footer">

                    </slot>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
    name: 'StandardTablePageOther',
    components: {},
    props: {
        isFilter: {
            type: Boolean,
            default: true
        },
        isOperate: {
            type: Boolean,
            default: true
        },
        isTable: {
            type: Boolean,
            default: true
        },
        isTableHeader:{
             type: Boolean,
            default: true
        },
        isTree: {
            type: Boolean,
            default: false
        },
        tableSpan: {
            type: Number,    
            default: 18
        },
        treeSpan: {
            type: Number,
            default: 6
        },
        showFilter: {
            type: Boolean,
            default: true
        },
    },
    data() { return {} },
    mounted() { },
    methods: {},
    computed: {
        treeCol() {
            if (!this.isTree || !this.isTable) {
                return 24;
            }

            return this.treeSpan;
        },

        tableCol() {
            if (!this.isTable || !this.isTree) {
                return 24;
            }

            return this.tableSpan;
        }
    },
}

</script>

<style>
.icon-space {
    margin-left: 5px
}
</style>