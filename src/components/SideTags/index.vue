<template>
    <div
        class="my-tags"
        :style="allTagsStyle"
        @mouseenter="hoverEvent"
        @mouseleave="hoverEvent"
    >
        <el-tabs
            v-model="activeName"
            class="my-tag"
            type="card"
            tab-position="left"
            :class="isExpand? 'my-tag-expand' : ''"
            :style="oneTagStyle"
            @tab-click="clickEvent"
            ref="sideTags"
        >
            <el-tab-pane v-for="(label, index) in labels" :label="label" :key="index" :name="label">
                <span slot="label">
                    <i class="my-tag-icon el-icon-arrow-left"></i>
                    {{ label }}
                </span>
                <el-card class="my-tag-content no-p" :style="`height: ${contentHeight + 2}px`">
                    <slot :name="label"></slot>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: "SideTags",
    components: {},
    props: {
        fromTop: {
            type: Number,
            default: 120
        },
        contentWidth: {
            type: Number,
            default: 400
        },
        contentHeight: {
            type: Number,
            default: 500
        },
        labels: {
            type: Array,
            default: () => []
        },
        hoverExpand: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            clickEvent: () => {},
            hoverEvent: () => {},
            isExpand: false,
            currentTagIndex: 0,
            currentTag: {},
            activeName: ''
        };
    },
    created() {
        if (this.hoverExpand) {
            this.clickEvent = tag => {
                this.currentTag = tag;
                this.currentTagIndex = tag.index;
                this.$emit("tag-click", tag);
            };

            this.hoverEvent = () => {
                this.isExpand = !this.isExpand;
            };
        } else {
            this.clickEvent = tag => {
                if (tag.index == this.currentTagIndex || !this.isExpand) {
                    this.isExpand = !this.isExpand;
                }

                this.currentTag = tag;
                this.currentTagIndex = tag.index;
                this.$emit("tag-click", tag);
            };
        }

        if (this.fromTop < 50) {
            console.warn("'from-top'小于50时将会和导航栏重叠！");
        }
        if (this.contentWidth < 400) {
            console.warn("'content-width'小于400时显示效果不佳！");
        }
        if (this.contentHeight < 500) {
            console.warn("'content-height'小于500时显示效果不佳！");
        }
    },
    mounted() {
        if (this.labels.length == 0) {
            console.error("必须添加至少一个标签！");
            return false;
        }
        this.currentTag = this.$refs.sideTags.panes[0];
    },
    methods: {

    },
    computed: {
        allTagsStyle() {
            return `width: ${this.contentWidth + 32}px; top: ${this.fromTop}px`
        },

        oneTagStyle() {
            return `height: ${this.contentHeight + 2}px; right: -${this.contentWidth + 2}px; ${this.isExpand? 'right: -2px;': `right: -${this.contentWidth + 2}px;`}`
        }
    },
    watch: {
        isExpand(newVal) {
            if (newVal) {
                this.$emit("show", this.currentTag);
            } else {
                this.$emit("hide", this.currentTag);
            }
            this.$emit("expandState",newVal)
        }
    }
};
</script>

<style lang="scss">
.my-tags {
    //width: 432px;
    position: fixed;
    //top: 120px;
    right: -2px;
    z-index: 100;
}

.my-tag {
    //height: 502px;
    width: 100%;
    position: absolute;
    //right: -402px;
    transition: 0.5s;
    overflow: visible !important;

    & > .el-tabs__header {
        margin: 0px !important;
        border-bottom: none !important;

        .el-tabs__nav {
            box-shadow: -1px 1px 1px 0 rgba(0, 0, 0, 0.1);
            margin-right: -1px;
        }

        .el-tabs__item {
            padding: 0 0px;
            width: 30px;
            min-height: 80px;
            text-align: center !important;
            writing-mode: vertical-rl;
            vertical-align: middle;
            line-height: 30px;
            background-color: #fff;
            border-right: 1px solid #e4e7ed !important;

            .my-tag-icon {
                display: none;
            }

            &.is-active {
                border-right: none !important;
                .my-tag-icon {
                    display: inline;
                }
            }

            &:first-of-type {
                border-top-left-radius: 4px;
            }

            &:last-of-type {
                border-bottom-left-radius: 4px;
            }
        }

        .el-tabs__active-bar {
            display: none !important;
        }

        .el-tabs__nav-wrap {
            &, .el-tabs__nav-scroll {
                overflow: visible !important;
            }
            margin-right: 0px !important;

            &::after {
                display: none !important;
            }


        }
    }

    & > .el-tabs__content {
        overflow: visible !important;
    }
}

.my-tag-content {
    background-color: #fff;
    box-shadow: -2px 2px 2px 1 rgba(0, 0, 0, 0.1) !important;
    border-radius: 0px;
    border-bottom-left-radius: 4px;
    //height: 502px;
    .el-card__body {
        background-color: #fff;
        height: 100%;
    }
}

.el-icon-arrow-left:before {
    content: "\e6de";
}
.my-tag-expand {
    .el-icon-arrow-left:before {
        content: "\e6e0";
    }
}
</style>