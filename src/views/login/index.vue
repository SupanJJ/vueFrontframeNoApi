<template>
    <div
        class="login-block"
        :style="`background-image: url(${backgroundImg});`"
    >
        <el-card class="login-form-layout">
            <el-form
                autocomplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="left"
                class="jq-login-form"
            >
                <h2 class="login-title color-main">
                    {{ appInfo.appName }}
                    <span style="font-size: 15px; color: #909399;">
                        {{ appInfo.version }}
                    </span>
                </h2>
                <el-form-item prop="username">
                    <el-input
                        name="username"
                        type="text"
                        v-model="loginForm.username"
                        autocomplete="on"
                        placeholder="请输入用户名"
                        size="medium"
                        :ref="`element-1`"
                        @keyup.enter.native="nextFocus(1, $event)"
                    >
                        <template slot="prepend">
                            <jq-icon icon="user"></jq-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        name="password"
                        show-password
                        :ref="`element-2`"
                        @keyup.enter.native="doLogin"
                        v-model="loginForm.password"
                        autocomplete="on"
                        placeholder="请输入密码"
                        size="medium"
                    >
                        <template slot="prepend">
                            <jq-icon icon="key"></jq-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px; text-align: center;">
                    <el-button
                        style="width: 100%"
                        size="medium"
                        type="primary"
                        :loading="loading"
                        @click.native.prevent="doLogin"
                    >登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <div style="text-align: center; position: absolute; bottom: 0;width: 100%;">
            <jq-icon icon="copyright"></jq-icon> {{ appInfo.company }}
            <jq-icon icon="phone-square"></jq-icon> {{ appInfo.companyTel }}
        </div>
    </div>
</template>

<script>
import backgroundImg from '@/assets/background_b.jpg';
import { setCookie, getCookie } from "@/api/cookie";
export default {
    components: {},
    props: {},
    data() {
        const validatePass = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error('密码不能小于3位'));
            } else {
                callback();
            }
        };
        return {
            backgroundImg,
            loginForm: {
                username: "",
                password: "",
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
                // password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },
            loading: false,
            appInfo: {
                appName: process.env.VUE_APP_NAME,
                version: process.env.VUE_APP_VERSION,
                company: process.env.VUE_APP_COMPANY,
                companyTel: process.env.VUE_APP_COMPANY_TEL
            }
        };
    },
    mounted() {
    
    },
    methods: {
        nextFocus(flag, e) {
            e.target.blur();
            if (flag == 1) {
                this.$refs[`element-${flag + 1}`].focus();
                this.$refs[`element-${flag}`].blur();
            }
        },
        doLogin() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    this.loading = true;
                    this.$auth.login(this.loginForm).then(() => {
                        this.$router.push('/');
                    }).catch((error) => {
                        this.$message.error('登陆失败！用户名或密码错误！');
                    }).finally(() => {
                        this.loading = false;
                    })
                } else {
                    this.$message.error('参数验证不合法！');
                    return false
                }
            })
        }
    },
    computed: {},
}

</script>

<style lang="scss">
.login-block {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    box-sizing: border-box;
}

.login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    padding: 20px;
    background: hsla(0, 0%, 100%, 0.6) border-box;
    border: none;
}

.login-title {
    text-align: center;
}

.jq-login-form {
    .el-input {
        .el-input-group__prepend {
            background-color: #fff;
        }
    }
}
</style>