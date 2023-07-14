<template>
    <div class="Box flex border">
        <div class="title FSizeB">
            {{ status == 0 ? "登录" : "注册" }}
            <span
                class="FsizeN pointer"
                @click="
                    status = !status;
                    clear();
                "
                >{{ status == 0 ? "没有账户?去注册" : "已有账户?去登录" }}</span
            >
        </div>
        <div class="input flex">
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
        <div class="msg"></div>

        <div class="input flex" v-if="status">
            <input
                type="text"
                name="email"
                id="email"
                required
                class="border"
                v-model="userinfo.email"
            />
            <span>邮箱</span>
        </div>
        <div
            class="msg"
            v-if="status"
            v-text="emailMSG ? '' : '邮箱不符合规范'"
        ></div>

        <div class="input flex">
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
        <div
            class="msg"
            v-if="status"
            v-text="pwdMSG ? '' : '密码不符合4-12位规范'"
        ></div>
        <div class="msg" v-else></div>

        <div class="input flex" v-if="status">
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
        <div class="msg" v-if="status" v-text="repwdMSG"></div>

        <div class="slider-demo-block">
            <span class="demonstration">滑动至{{ value1 }}以验证</span>
            <el-slider v-model="value2" :step="10" show-stops />
        </div>
        <div class="button flex">
            <button class="clear flex border" @click="clear">清空</button>
            <button
                v-if="!status"
                class="submit flex border"
                @click="submit"
                :disabled="loading || !verify"
            >
                {{ loading ? "Loading..." : "点我登录" }}
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
                    !pwdMSG
                "
            >
                {{ loading ? "Loading..." : "免费注册" }}
            </button>
        </div>
        <div>
            <a class="a" href="javascript:;" v-if="status">隐私条款</a>
            <input type="checkbox" v-if="status" v-model="checked" />
            <span style="color: var(--red); margin-left: 30px">{{
                message
            }}</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { log } from "console";
import { ref, reactive, computed, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Login, Sign } from "../../apis/loginApis";

// import {useuserinfoStore} from '../../stores/user'
// import {storeToRefs} from 'pinia'
// const userStore = useuserinfoStore()

const router = useRouter();
let loading = ref(false);

// 登录 & 注册 状态
let status = ref<number>(0);

// 验证码
let value1 = ref<number>(1);
let value2 = ref<number>(0);

// 条款
let checked = ref<boolean>(false);

// 信息
let message = ref<string>("");

// 用户数据
const userinfo = reactive({
    username: "",
    password: "",
    repassword: "",
    email: "",
});

// 正则检验
let emailMSG = computed(() => {
    var reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag: boolean = reg.test(userinfo.email) || userinfo.email == "";
    return flag;
});
let pwdMSG = computed(() => {
    var reg = /^[\S]{4,12}$/;
    let flag: boolean = reg.test(userinfo.password) || userinfo.password == "";
    return flag;
});
let repwdMSG = computed(() =>
    userinfo.password === userinfo.repassword ? "" : "两次输入密码不同"
);


function clear(): void {
    userinfo.username = "";
    userinfo.password = "";
    userinfo.repassword = "";
    value2.value = 0;
    checked.value = false;
    message.value = "";
    userinfo.email = "";
}

let verify = computed(() => {
    return (
        value1.value == value2.value && userinfo.username && userinfo.password
    );
});

async function submit() {
    loading.value = true;
    try {
        const data = await Login(userinfo);
        if (data.token) {
            localStorage.setItem("token", data.token);
            router.push("/home");
        } else {
            localStorage.removeItem("token");
        }
        clear();
        loading.value = false;
        message.value = data.message;
    } catch (e) {
        console.log(e);
        message.value = e;
        loading.value = true;
        clear();
    }
}

async function signIn() {
    loading.value = true;
    const data = await Sign(userinfo);
    loading.value = false;
    message.value = data.message;
}

onMounted(() => {
    value1.value = Math.ceil(Math.random() * 10) * 10;
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
        width: 100%;
        color: var(--borderColor);
        margin-bottom: 20px;
        position: relative;
        span {
            font-size: 14px;
            text-align: center;
            position: absolute;
            right: 20px;
            bottom: 20px;
            transition: 0.2s;
        }
        span:hover {
            color: var(--color);
        }
    }
    .msg {
        margin: 5px 20px;
        color: var(--red);
        height: 20px;
        width: calc(100% - 40px);
        text-align: right;
    }
    .input {
        position: relative;
        justify-content: center;
        height: 50px;
        input {
            width: 90%;
            background: transparent;
            outline: 0;
            height: 50px;
            border-radius: 10px;
            padding: 10px;
        }
        span {
            position: absolute;
            font-size: 1.5em;
            left: 30px;
            top: 10px;
            pointer-events: none;
            text-transform: uppercase;
            transition: 0.5s;
        }
        input:focus ~ span,
        input:valid ~ span {
            color: var(--white);
            background-color: var(--color);
            font-size: 1em;
            padding: 2px 20px;
            border-radius: 5px;
            transform: translateX(10px) translateY(-20px);
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
            height: 40px;
            margin: 20px;
            justify-content: center;
            line-height: 40px;
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
}
</style>