<template>
    <div class="navbar">
        <toggle-btn
            :is-active="sidebar.opened"
            class="toggle-btn-container"
            @toggleClick="toggleSideBar"
        />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <div
                class="nav-item"
                style="line-height: 50px;"
            >
                <input-method-picker />
            </div>
            <div class="nav-item">
                <div class="nav-gap"></div>
            </div>
            <div class="nav-item">
                <el-dropdown
                    class="avatar-container"
                    trigger="click"
                >
                    <el-row style="height: 50px">
                        <el-col
                            :span="8"
                            style="width: 40px; height: 50px; line-height: 50px"
                        >
                            <el-avatar
                                :size="32"
                                class="user-avatar"
                                icon="el-icon-user-solid"
                            ></el-avatar>
                        </el-col>
                        <el-col
                            :span="10"
                            style="width: 60px; height: 50px; text-align: center;"
                        >
                            <el-row style="height: 50px; line-height: 50px">
                                {{ username }}
                            </el-row>
                        </el-col>

                        <el-col
                            :span="4"
                            style="width: 10px; height: 50px; line-height: 50px"
                        >
                            <i class="el-icon-caret-bottom" />
                        </el-col>
                    </el-row>
                    <el-dropdown-menu
                        slot="dropdown"
                        style="top: 50px;"
                    >
                        <router-link to="/">
                            <el-dropdown-item style="text-align: center;">
                                首页
                            </el-dropdown-item>
                        </router-link>
                        <el-dropdown-item
                            divided
                            style="text-align: center;"
                        >
                            <span
                                style="display:block;"
                                @click="logout"
                            >登 出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from './Breadcrumb'
import ToggleBtn from './ToggleBtn'
import InputMethodPicker from './InputMethodPicker'

export default {
    components: {
        Breadcrumb,
        ToggleBtn,
        InputMethodPicker
    },
    data() {
        return {
            
        }
    },
    mounted() {

    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            await this.$store.dispatch('auth/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    },
    computed: {
        sidebar() {
            return this.$store.getters['app/sidebar'];
        },
        username() {
            return this.$store.getters['auth/username'];
        },
    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(to right, #0067d5, #008ced);
    //box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);

    .toggle-btn-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        //line-height: 45px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            //margin-right: 30px;
            color: #fff;
            cursor: pointer;

            .user-avatar {
                vertical-align: middle;
                margin-right: 8px;
                background-color: #fff;
            }
        }
    }

    .nav-item {
        height: 50px;
        margin: 0;
        float: left;
        list-style: none;
        position: relative;
        cursor: pointer;

        &:last-of-type {
            margin-right: 20px;
        }
    }

    .nav-gap {
        position: relative;
        width: 1px;
        height: 50px;
        padding: 0 15px;
        &:before {
            content: "";
            position: absolute;
            top: calc(50% - 8px);
            width: 1px;
            height: 16px;
            background: #ebebeb;
        }
    }

    .hos-title {
        color: #fff;
        font-size: 20px;
        font-weight: bold;
    }
}
</style>

<style lang="scss">
.user-avatar .el-icon-user-solid {
    color: #1f75da;
}
</style>

