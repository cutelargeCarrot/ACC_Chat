<template>
    <div class="user flex">
        <div class="title flex FSizeB pointer" @click="jump()">返回</div>

        <div class="info">
            <p class="FSizeB">用户信息</p>

            <div class="flex divcolor">
                <span>用户名:</span>
                <div class="span">{{ userinfo.username }}</div>
            </div>

            <div class="flex">
                <span>昵称:</span>
                <input
                    class="input"
                    type="text"
                    v-model.trim="userinfo.nickname"
                    @blur="update"
                />
            </div>

            <div class="flex">
                <span>邮箱:</span>
                <div class="span">{{ userinfo.email }}</div>
            </div>

            <div class="flex">
                <span>手机号:</span>
                <input
                    class="input"
                    type="text"
                    v-model.trim="userinfo.phoneNumber"
                    @blur="update"
                />
            </div>
            <div class="flex">
                <span>用户状态:</span>
                <div class="span">
                    {{ userinfo.isFrozen ? "冻结" : "正常" }}
                </div>
            </div>
            <div class="flex">
                <span>注册时间:</span>
                <div class="span">{{ userinfo.createTime }}</div>
            </div>

            <div class="flex"></div>
            <p class="FSizeB">安全 - 邮箱更改</p>
            <div class="flex divcolor email">
                <span>邮箱:</span>
                <input class="input" type="text" v-model="userinfo.newEmail" />
                <button
                    class="border"
                    @click="getEmailCaptcha"
                    :disabled="!RegEmail || !userinfo.newEmail"
                >
                    {{ emailcodeButton }}
                </button>
            </div>
            <div class="flex">
                <span>验证码:</span>
                <input class="input" type="text" v-model="captcha" />
            </div>
            <div class="flex">
                <button class="border" @click="updateEmail">
                    提交邮箱更改
                </button>
            </div>
            <div class="flex">
                <span style="color: var(--red)">{{
                    RegEmail ? "" : "邮箱格式错误"
                }}</span>
            </div>

            <p class="FSizeB">安全 - 密码更改</p>

            <div class="flex divcolor email">
                <span>新密码:</span>
                <input
                    class="input"
                    v-model="userinfo.password"
                    type="password"
                    placeholder="点击输入"
                    style="  text-align: right;"
                />
            </div>

            <div class="flex email">
                <span>验证码:</span>
                <input class="input" type="text" v-model="captcha" />
                 <button
                    class="border"
                    @click="getPasswordCaptcha"
                >
                    {{ emailcodeButton }}
                </button>
            </div>
            <div class="flex">
                <button class="border" @click="updatePassw">
                    提交密码更改
                </button>
            </div>

            <div class="flex">
                <span style="color: var(--red)">{{
                    RegEmail ? "" : "邮箱格式错误"
                }}</span>
                <div class="flex"></div>
                <component v-if="manage" :is="manage">
                    <AdminButton></AdminButton>
                </component>
                <div class="flex"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, onMounted, ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import {
    getUserinfo,
    UpdateEmail,
    UpdatePassword,
    updateUserinfo,
} from "../apis/userinfoApis";
import { UpdateInfoCode, UpdatePasswordCode } from "../apis/emailApis";
import { openError, openSuccess } from "../hooks/usePOP";

const router = useRouter();
const userinfo = reactive({
    username: "",
    email: "",
    newEmail: "",
    nickname: "",
    phoneNumber: "",
    createTime: "",
    updateTime: "",
    isFrozen: "",
    password: "",
    isAdmin: false,
});
//
//
const captcha = ref<Number>();
//
const manage = computed(() => {
    return userinfo.isAdmin ? "success" : "";
});
//
let RegEmail = computed(() => {
    var reg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag: boolean = reg.test(userinfo.newEmail) || userinfo.newEmail == "";
    return flag;
});
//
let time = ref(0);
let emailcodeButton = computed(() => {
    if (time.value > 0) {
        setTimeout(() => {
            time.value = time.value - 1;
        }, 1000);
    }
    return time.value > 0 ? time : "获取验证码";
});
// GET INFO
async function getUserInfo() {
    try {
        const data = await getUserinfo();
        userinfo.username = data.data.username;
        userinfo.nickname = data.data.nickname;
        userinfo.email = data.data.email;
        userinfo.createTime = data.data.createTime;
        userinfo.updateTime = data.data.updateTime;
        userinfo.phoneNumber = data.data.phoneNumber;
        userinfo.isFrozen = data.data.isFrozen;
        userinfo.isAdmin = data.data.isAdmin;
    } catch (e) {
        console.log(e);
    }
}
// CHANGE INFO
async function update() {
    try {
        const data = await updateUserinfo(userinfo);
        if (data.status >= 400) {
            openError(data.data);
        }
    } catch (e) {
        console.log(e);
    }
}
// 更改邮箱
async function updateEmail() {
    try {
        const data = await UpdateEmail({
            email: userinfo.newEmail,
            captcha: captcha.value,
        });
        if (data.status >= 400) openError(data.data);
        else openSuccess(data.data);
    } catch (e) {
        openError("修改失败");
        console.log(e);
    }
}
// 更改密码
async function updatePassw() {
    try {
        const data = await UpdatePassword({
            password: userinfo.password,
            email: userinfo.email,
            captcha: captcha.value,
        });
        if (data.status >= 400) openError(data.data);
        else openSuccess(data.data);
    } catch (e) {
        openError("修改失败");
        console.log(e);
    }
}
//  改邮箱验证码
async function getEmailCaptcha() {
    time.value = 20;
    try {
        const data = await UpdateInfoCode(userinfo.newEmail);
        if (data.status >= 200 && data.status < 300) {
            openSuccess(data.data);
        } else {
            openError("发送失败");
        }
    } catch (e) {
        console.log(e);
        openError(e);
    }
}
//  改密码验证码
async function getPasswordCaptcha() {
    time.value = 20;
    try {
        const data = await UpdatePasswordCode(userinfo.email);
        if (data.status >= 200 && data.status < 300) {
            openSuccess(data.data);
        } else {
            openError("发送失败");
        }
    } catch (e) {
        console.log(e);
        openError(e);
    }
}
function jump() {
    router.back();
}
onMounted(() => {
    getUserInfo();
});
</script>

<style lang='scss' scoped>
.user {
    background-color: var(--background);
    overflow: auto;
    opacity: 0.8;
    width: 100%;
    height: calc(100vh - 50px);
    margin-top: 20px;
    padding: 30px 0;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    .title {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        border-radius: 10px;
      
        width: 90%;
        max-width: 900px;
        justify-content: end;
        color: var(--color);
        background-image: linear-gradient(-90deg, var(--bgColor), var(--white));
    }
    .title:hover {
        background-image: linear-gradient(
            -90deg,
            var(--bgColor),
            var(--bgColor)
        );
    }
    .info {
        max-width: 900px;
        width: 90%;
        p {
            width: 100%;
            display: inline-block;
            border-bottom: 1px solid var(--color);
            color: var(--color);
            padding: 10px 0;
        }
        .divcolor {
            background-image: linear-gradient(
                180deg,
                var(--bgColor),
                var(--background)
            );
        }
        .divcolorRed {
            background-image: linear-gradient(
                180deg,
                rgb(255, 227, 227),
                var(--background)
            );
        }
        div {
            display: flex;
            padding: 2px;
            justify-content: space-around;
            align-items: center;
            height: 60px;
            flex-wrap: wrap;
            color: var(--color);
            span {
                font-size: 16px;
                text-align: r;
            }
            .span {
                font-size: 16px;
                flex: 1;
                justify-content: end;
            }
            .input {
                padding-right: 2px;
                outline: 0;
                flex: 1;
                height: 40px;
                font-size: 16px;
                text-align: right;
                background-color: transparent;
                border: 0px solid transparent;
                transition: 0.5s;
            }
            .input:focus {
                border-bottom: 1px solid var(--color);
            }
            button {
                color: var(--color);
                background-color: transparent;
                width: 50%;
                padding: 10px 20px;
            }
            button:disabled {
                color: var(--gray);
                border-color: var(--gray);
                background-color: transparent;
            }
            .a {
                color: var(--red);
                color: var(--color);
                background-color: transparent;
                width: 50%;
                padding: 10px 20px;
                text-align: center;
            }
        }
        .email {
            .input {
                flex: 1;
                text-align: left;
            }
            button {
                flex: 1;
                min-width: 50px;
                max-width: 200px;
                padding: 0;
                height: 60%;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>