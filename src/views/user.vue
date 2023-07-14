<template>
    <div class="user flex">
        <div class="title flex FSizeB pointer" @click="jump()">返回</div>
        <div class="info">
            <p class="FSizeB">用户信息</p>
            <div class="flex divcolor">
                <span>用户名:</span>
                <input
                    class="input"
                    type="text"
                    v-model="userinfo.username"
                    @blur="submit"
                />
            </div>
            <div class="flex">
                <span>邮箱:</span>
                <input
                    class="input"
                    type="text"
                    v-model="userinfo.email"
                    @blur="submit"
                />
            </div>
            <div class="flex">
            </div>
            <p class="FSizeB">安全 - 密码更改</p>
            <div class="flex divcolor">
                <span>旧密码:</span>
                <input
                    class="input"
                    type="password"
                    placeholder="点击输入"
                    v-model="password.oldPwd"
                />
            </div>
            <div class="flex">
                <span>新密码:</span>
                <input
                    class="input"
                    type="password"
                    placeholder="点击输入"
                    v-model="password.newPwd"
                />
            </div>
            <div class="flex">
                <button class="border" @click="submitPWD">提交密码更改</button>
            </div>
            <p class="FSizeB">通用信息</p>
            <div class="flex divcolor">
                <span>xxx:</span>
                <input class="input" type="text" placeholder="XXX" />
            </div>
            <div class="flex">
                <span>xxx:</span>
                <input class="input" type="text" placeholder="XXX" />
            </div>
            <div class="flex"></div>
            <p class="FSizeB" style="border-color: var(--red);color: var(--red)">注销账户</p>
            <div class="flex divcolorRed">
                <span>身份验证:</span>
                <input
                    class="input"
                    type="password"
                    placeholder="输入密码"
                    v-model="password.canselPwd"
                />
            </div>
            <div class="flex">
                <button
                    class="border"
                    style="color: var(--red)"
                    @click="goodbye"
                >
                    注销账户
                </button>
            </div>
            <div class="flex"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    getUserinfo,
    updateUserinfo,
    updatePwd,
    cancel,
} from "../apis/userinfoApis";
import { openError, openSuccess } from "../hooks/usePOP";

const router = useRouter();
const userinfo = reactive({
    username: "",
    email: "",
    nickname: "nickname",
});
const password = reactive({
    oldPwd: "",
    newPwd: "",
    canselPwd: "",
});
// GET INFO
async function getUserInfo() {
    const data = await getUserinfo();
    userinfo.username = data.data.username;
    userinfo.email = data.data.email;
}
// CHANGE INFO
async function submit() {
    const data = await updateUserinfo(userinfo);
    if (data.status == 1) {
        if (
            data.message ==
            "ER_DUP_ENTRY: Duplicate entry 'test1' for key 'users.username_UNIQUE'"
        )
            openError("用户名被占用");
        else openError(data.message);
        getUserInfo();
    }
}
// CHANGE PWD
async function submitPWD() {
    const data = await updatePwd(password);
    if (data.status == 0) openSuccess(data.message);
    else openError(data.message);
    clearPwd();
}
// 注销账户
async function goodbye() {
    const data = await cancel(password);
    clearPwd();
    if (data.status == 0) {
        openSuccess(data.message);
        localStorage.removeItem("token");
        router.push("login");
    } else {
        openError(data.message);
    }
}

function clearPwd():void {
    password.newPwd = "";
    password.oldPwd = "";
    password.canselPwd = "";
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
    height: 100vh;
    padding: 30px 0;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    .title {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        border-radius: 10px;
        width: 60%;
        justify-content: end;
        color: var(--color);
        background-image: linear-gradient(-90deg, var(--bgColor), var(--white));
    }
    .title:hover{
        background-image: linear-gradient(-90deg, var(--bgColor), var(--bgColor));
    }
    .info {
        width: 60%;

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
            padding: 2px;
            justify-content: space-around;

            align-items: center;
            height: 60px;
            flex-wrap: wrap;
            color: var(--color);
            span {
                font-size: 20px;
                width: 100px;
                text-align: center;
            }
            .input {
                outline: 0;
                height: 40px;
                padding: 0 10px;
                margin-left: 20px;
                font-size: 20px;
                text-align: center;
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
        }
    }
}
</style>