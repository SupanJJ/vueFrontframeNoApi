<template>
    <div
        class="sidebar-logo-container"
        :class="{'collapse':collapse}"
    >
        <span>
            <transition name="sidebarLogoFade">
                <span
                    v-if="collapse"
                    key="collapse"
                    class="sidebar-logo-link"
                >
                    <img
                        v-if="logo"
                        :src="logo"
                        class="sidebar-logo"
                    >
                    <h1
                        v-else
                        class="sidebar-title"
                    >vue前台框架</h1>
                </span>

                <span
                    v-else
                    key="expand"
                    class="sidebar-logo-link"
                >
                    <img
                        v-if="logo"
                        :src="logo"
                        class="sidebar-logo"
                    >
                    <h1 class="sidebar-title" style="margin-right: 10px">vue前台框架</h1>
                </span>
            </transition>
        </span>
        <!-- <el-dropdown size="small" trigger="click" style="cursor: pointer;">
            <span>
                <transition name="sidebarLogoFade">
                    <span
                        v-if="collapse"
                        key="collapse"
                        class="sidebar-logo-link"
                    >
                        <img
                            v-if="logo"
                            :src="logo"
                            class="sidebar-logo"
                        >
                        <h1
                            v-else
                            class="sidebar-title"
                        >{{ title }} </h1>
                    </span>

                    <span
                        v-else
                        key="expand"
                        class="sidebar-logo-link"
                    >
                        <img
                            v-if="logo"
                            :src="logo"
                            class="sidebar-logo"
                        >
                        <h1 class="sidebar-title" style="margin-right: 10px">{{ title }} </h1>
                    </span>
                </transition>
            </span>
            <el-dropdown-menu slot="dropdown" class="module-jump">
                <el-dropdown-item
                    v-for="(module, index) in modules"
                    :key="module.ID"
                    :divided="index > 0"
                    style="text-align: center;"
                >
                    <a
                        :href="urlWithToken(module.AppUrl)"
                        target="_blank"
                        rel="noopener"
                    >
                        <jq-icon v-if="module.AppIcon" :icon="module.AppIcon"></jq-icon>
                        {{ module.AppName }}
                    </a>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> -->
    </div>
</template>

<script>
import { getToken,getLoginUser } from '@/utils';
import logo from '@/assets/logo_w.png';

export default {
    name: 'SidebarLogo',
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            logo: logo
        }
    },
    methods: {
        urlWithToken(url) {
            return `${url}?token=${getToken()}&loginuser=${getLoginUser()}`;
        }
    },
    computed: {
        // title() {
        //     if (this.$store.getters['auth/gotModules']) {
        //         let currentModule = {};
        //         this.$store.getters['auth/myModules'].some(e => {
        //             if (e.AppID == process.env.VUE_APP_ID) {//if (e.name == process.env.VUE_APP_MODULE_NAME) {
        //                 currentModule = e;
        //                 return true;
        //             }
        //             else {
        //                 return false;
        //             }
        //         });
        //         document.title = currentModule.AppName;
        //         return currentModule.AppName;
        //     }
        //     else {
        //         document.title = 'JQ HIS';
        //         return 'JQ HIS';
        //     }
        // },
        // modules() {
        //     if (this.$store.getters['auth/gotModules']) {
        //         let myModules = this.$store.getters['auth/myModules'].filter(e => {
        //             //return e.name !== process.env.VUE_APP_MODULE_NAME;
        //             return e.AppID.toString() !== process.env.VUE_APP_ID;
        //         });

        //         return myModules;
        //     }
        //     else {
        //         return [];
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #0067d5;
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
        height: 100%;
        width: 100%;

        & .sidebar-logo {
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }

    &.collapse {
        .sidebar-logo {
            margin-right: 0px;
        }
    }
}
</style>

<style lang="scss">
.module-jump {
    width: 160px;
    left: 10px !important;
}
</style>
