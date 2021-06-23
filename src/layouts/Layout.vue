<template>
    <div
        :class="classObj"
        class="app-wrapper"
    >
        <div
            v-if="device==='mobile'&&sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside"
        />
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <navbar />
            </div>
            <tags-view />
            <app-main />

            <div class="fixed-bottom">
                <jq-icon icon="copyright"></jq-icon> {{ appInfo.company }}
                <jq-icon icon="phone-square"></jq-icon> {{ appInfo.companyTel }}
                <jq-icon icon="tag"></jq-icon> {{ appInfo.version }}
            </div>
        </div>
    </div>
</template>

<script>
import { Navbar, TagsView, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
    name: 'Layout',
    components: {
        Navbar,
        TagsView,
        Sidebar,
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        sidebar() {
            return this.$store.getters['app/sidebar'];
        },
        device() {
            return this.$store.getters['app/device'];
        },
        fixedHeader() {
            return this.$store.getters['app/fixedHeader'];
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    data() {
        return {
            appInfo: {
                appName: process.env.VUE_APP_NAME,
                version: process.env.VUE_APP_VERSION,
                company: process.env.VUE_APP_COMPANY,
                companyTel: process.env.VUE_APP_COMPANY_TEL
            }
        }
    },
    mounted() {
        //防止页面随便刷新
        window.onbeforeunload = function (e) {
            e = e || window.event;
            // 兼容IE8和Firefox 4之前的版本
            if (e) {
                e.returnValue = '内容可能不会保存！';
            }
            // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
            return '内容可能不会保存！';
        }
    },
    destroyed() {
        window.onbeforeunload = null
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', false)
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.fixed-bottom {
    bottom: 0;
    right: 0;
    z-index: 9;
    position: fixed;
    width: 100%;
    transition: width 0.28s;
    text-align: right;
    color: #909399;
    box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
    padding-right: 10px;
    height: 25px;
    line-height: 25px;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
</style>
