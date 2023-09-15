<template>
    <div class="Box flex border">
        <div class="title FSizeBP">
            {{ statustitle[status] }}
            <!-- 转注册 -->
            <span
                class="FsizeN pointer"
                v-if="status != 2"
                @click="
                    changestatus(2);
                    clear();
                    YZM();
                "
                >没有账户?去注册</span
            >
            <span
                class="FsizeN pointer"
                v-if="status == 2"
                @click="
                    changestatus(0);
                    clear();
                    YZM();
                "
                >已有账户?去登录</span
            >
        </div>

        <div class="input flex" v-if="status != 1">
            <input
                type="text"
                name="username"
                id="username"
                required
                class="border"
                v-model="userinfo.username"
            />
            <span>用户名</span>
        </div>

        <div class="msg" v-if="status == 2"></div>

        <div class="input flex" v-if="status == 2">
            <input
                type="text"
                name="nickName"
                id="nickName"
                required
                class="border"
                v-model="userinfo.nickname"
            />
            <span>昵称</span>
        </div>

        <div class="msg" v-if="status != 1"></div>

        <div class="input flex" v-if="!status">
            <input
                type="password"
                name="password"
                id="password"
                required
                class="border"
                v-model="userinfo.password"
            />
            <span>密码</span>
        </div>
        <div class="msg" v-if="!status"></div>

        <div class="input flex" v-if="status">
            <input
                type="password"
                name="password"
                id="password"
                required
                class="border"
                v-model="userinfo.password"
            />
            <span>{{ status === 1 ? "新密码" : "密码" }}</span>
        </div>

        <div
            class="msg"
            v-if="status"
            v-text="pwdMSG ? '' : '密码不符合 4-20 位规范'"
        ></div>

        <div class="input flex" v-if="status == 2">
            <input
                type="password"
                name="repassword"
                id="repassword"
                required
                class="border"
                v-model="userinfo.repassword"
            />
            <span>确认密码</span>
        </div>
        <div class="msg" v-if="status == 2" v-text="repwdMSG"></div>

        <div class="input flex email" v-if="status">
            <input
                type="text"
                name="email"
                required
                class="border"
                v-model="userinfo.email"
            />
            <span>邮箱</span>

            <button
                class="border flex submit"
                v-text="emailcodeButton"
                @click="getCode"
                :disabled="!userinfo.email || !emailMSG || time"
            ></button>
        </div>

        <div
            class="msg"
            v-if="status"
            v-text="emailMSG ? '' : '邮箱不符合规范'"
        ></div>

        <div class="input flex" v-if="status">
            <input
                type="text"
                name="email"
                required
                class="border"
                v-model="userinfo.captcha"
            />
            <span>验证码</span>
        </div>
        <div class="msg" v-if="status"></div>

        <div class="slider-demo-block">
            <span class="demonstration">滑动至{{ value1 }}以验证</span>
            <el-slider v-model="value2" :step="10" show-stops />
        </div>
        <div>
            <a class="a" href="javascript:;" v-if="status == 2">隐私条款</a>
            <input type="checkbox" v-if="status == 2" v-model="checked" />
            <span style="color: var(--red); margin-left: 30px"></span>
        </div>
        <div class="button flex">
            <button class="clear flex border" @click="clear">清空</button>

            <button
                v-if="status != 2"
                class="submit flex border"
                @click="submit(status)"
                :disabled="loading || !verify"
            >
                {{
                    loading
                        ? "Loading..."
                        : status === 0
                        ? "点我登录"
                        : "修改密码"
                }}
            </button>

            <button
                v-else
                class="submit flex border"
                @click="signIn"
                :disabled="
                    loading ||
                    !verify ||
                    userinfo.password != userinfo.repassword ||
                    !userinfo.email ||
                    !emailMSG ||
                    !checked ||
                    !pwdMSG ||
                    !userinfo.nickname ||
                    !userinfo.captcha
                "
            >
                {{ loading ? "Loading..." : "免费注册" }}
            </button>
        </div>

        <div class="mintitle flex" v-if="status != 2">
            <!-- 转登录 密码 -->
            <span
                class="FsizeN pointer"
                v-if="status == 1"
                @click="
                    changestatus(0);
                    clear();
                    YZM();
                "
                >密码登录</span
            >
            <!-- 转登录 验证码 -->

            <span
                class="FsizeN pointer"
                v-if="status == 0"
                @click="
                    changestatus(1);
                    clear();
                    YZM();
                "
                >忘记密码？</span
            >
            <span><router-link to="/adminLogin">管理员入口</router-link></span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { log } from "console";
import { ref, reactive, computed, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import {  SignInCode, UpdatePasswordCode } from "../apis/emailApis";
import { FindPassword, Login, Sign } from "../apis/loginApis";
import { openSuccess, openError } from "../hooks/usePOP.js";

// import {useuserinfoStore} from '../../stores/user'
// import {storeToRefs} from 'pinia'
// const userStore = useuserinfoStore()

const router = useRouter();
let loading = ref(false);

// 登录 & 注册 状态     0 密码登录 / 1 验证码登录 / 2 注册
let status = ref<Number>(0);
let statustitle = reactive<String[]>(["密码登录", "找回密码", "注册"]);

function changestatus(type: Number): void {
    status.value = type;
}

// 验证码
let value1 = ref<Number>(1);
let value2 = ref<Number>(0);

// 条款
let checked = ref<Boolean>(false);

// 信息

// 用户数据
const userinfo = reactive({
    username: "",
    nickname: "",
    password: "",
    repassword: "",
    email: "",
    captcha: "",
});

// 正则检验
let emailMSG = computed(() => {
    var reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag: boolean = reg.test(userinfo.email) || userinfo.email == "";
    return flag;
});
let pwdMSG = computed(() => {
    var reg = /^[\S]{4,20}$/;
    let flag: boolean = reg.test(userinfo.password) || userinfo.password == "";
    return flag;
});
let repwdMSG = computed(() =>
    userinfo.password === userinfo.repassword || !userinfo.repassword
        ? ""
        : "两次输入密码不同"
);
let time = ref(0);

let emailcodeButton = computed(() => {
    if (time.value > 0) {
        setTimeout(() => {
            time.value = time.value - 1;
        }, 1000);
    }
    return time.value > 0 ? time : "获取验证码";
});

function clear(): void {
    userinfo.username = "";
    userinfo.password = "";
    userinfo.repassword = "";
    value2.value = 0;
    checked.value = false;
    userinfo.email = "";
    userinfo.captcha = "";
    userinfo.nickname = "";
}

let verify = computed(() => {
    if (status.value == 1) {
        return (
            value1.value == value2.value &&
            userinfo.password &&
            userinfo.captcha
        );
    }
    return (
        value1.value == value2.value && userinfo.username && userinfo.password
    );
});
function submit(status) {
    if (status) {
        submitFindPassword();
    } else {
        submitLogin();
    }
}
async function submitLogin() {
    loading.value = true;
    try {
        const data = await Login({
            username: userinfo.username,
            password: userinfo.password,
        });
        if (data.status === 400) openError(data.data);
        if (data.data.accessToken) {
            localStorage.setItem("access_token", data.data.accessToken);
            localStorage.setItem("refresh_token", data.data.refreshToken);
            router.push("/home");
        } else {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
        clear();
        loading.value = false;
    } catch (e) {
        console.log(e);
        openError("登陆失败");
        loading.value = false;
        clear();
    }
}
// 修改密码
async function submitFindPassword() {
    loading.value = true;
    try {
        const data = await FindPassword(userinfo);
        if(data.status >= 400)openError(data.data)
        else openSuccess("修改成功");
        loading.value = false;
    } catch (e) {
        console.log(e);
        openError("修改失败");
        loading.value = false;
    }
}
// 注册
async function signIn() {
    loading.value = true;
    try {
        const data = await Sign(userinfo);
        loading.value = false;
        if (data.status >= 200 && data.status < 300) openSuccess(data.data);
        if (data.status >= 400) openError(data.data);
        status.value = 0;
        YZM();
    } catch (e) {
        openError("注册失败 " + e);
        console.log(e);
        loading.value = false;
    }
}
// 获取验证码
async function getCode() {
    time.value = 20;
    try{
        if (status.value === 1) {
        const data = await UpdatePasswordCode(userinfo.email);
        if (data.status >= 400) openError( "发送失败");
        else openSuccess(data.data || "发送成功");
    }
    if (status.value === 2) {
        const data = await SignInCode(userinfo.email);
        if (data.status >= 400) openError("发送失败");
        else openSuccess(data.data || "发送成功");
    }
    } catch(e) {
        console.log(e)
    }
}

function YZM() {
    value1.value = Math.ceil(Math.random() * 10) * 10;
}
onMounted(() => {
    YZM();
});
</script>

<style lang='scss' scoped>
.Box {
    flex-direction: column;
    justify-content: start;
    padding: 20px 10px;
    border-radius: 10px;
    background-color: var(--background);
    width: 400px;
    box-shadow: 0 0 7px 1px rgba(112, 77, 155, 0.284),
        0px 3px 5px 1px rgba(86, 38, 125, 0.366);
    .title {
        padding: 5%;
        padding-bottom: 10px;
        margin-bottom: 15px;
        width: 100%;
        color: var(--borderColor);
        position: relative;
        span {
            font-size: 14px;
            text-align: center;
            position: absolute;
            right: 20px;
            bottom: 10px;
            transition: 0.2s;
        }
        span:hover {
            color: var(--color);
        }
    }
    .mintitle {
        width: 100%;
        margin-bottom: 15px;
        text-align: center;
        color: var(--borderColor);
        height: 20px;
        padding: 0 20px;
        justify-content: space-between;
        span {
            a {
                color: var(--borderColor);
            }
        }
    }
    .msg {
        margin: 5px 20px;
        color: var(--red);
        height: 15px;
        width: calc(100% - 40px);
        text-align: right;
    }
    .input {
        position: relative;
        justify-content: center;
        height: 40px;
        input {
            width: 90%;
            background: transparent;
            outline: 0;
            height: 40px;
            border-radius: 10px;
            padding: 10px;
        }
        span {
            position: absolute;
            font-size: 1.5em;
            left: 30px;
            top: 5px;
            pointer-events: none;
            text-transform: uppercase;
            transition: 0.5s;
        }
        input:focus ~ span,
        input:valid ~ span {
            color: var(--color);
            background-color: var(--background);
            font-size: 1em;
            padding: 2px 20px;
            border-radius: 5px;

            transform: translateX(10px) translateY(-20px);
        }
    }

    .email {
        padding: 0 20px;
        input {
            flex: 3;
        }
        button {
            flex: 1;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            margin-left: 20px;
            background-color: var(--background);
            color: var(--borderColor);
        }
        button:disabled {
            border-color: var(--gray);
            color: var(--gray);
        }
    }

    .a {
        margin: 20px;
        display: inline-block;
    }
    .a:hover {
        color: var(--color);
    }
    .button {
        .clear,
        .submit {
            height: 30px;
            margin: 20px;
            justify-content: center;
            line-height: 30px;
            border-radius: 10px;
            background-color: var(--background);
            color: var(--color);
            flex: 1;
        }
        .submit {
            flex: 4;
        }
        button:active {
            background-color: var(--borderColor);
        }
        button:disabled {
            color: var(--gray);
            border-color: var(--gray);
        }
    }
    .slider-demo-block {
        display: flex;
        align-items: center;
        width: 90%;
        margin-left: 20px;
    }
    .slider-demo-block .el-slider {
        margin-top: 0;
        margin-left: 12px;
    }
    .slider-demo-block .demonstration {
        font-size: 12px;
        color: var(--color);
        line-height: 44px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0;
    }
    .slider-demo-block .demonstration + .el-slider {
        flex: 0 0 60%;
    }

    .admin {
        justify-content: start;
        padding-left: 20px;
        font-size: 1em;
        a {
            color: var(--color);
        }
    }
}
</style>