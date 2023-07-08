<template>
    <div class="Box flex border">
        <div class="title FSizeB">
            {{ status == 0 ? "登录" : "注册" }}
            <span class="FsizeN pointer" @click="status = !status ; clear()">{{
                status == 0 ? "没有账户?去注册" : "去登录"
            }}</span>
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
                :disabled="loading || !verify "
            >
                点我登录
            </button>

            <button
                v-else
                class="submit flex border"
                @click="submit"
                :disabled="
                    loading ||
                    !verify ||
                    userinfo.password != userinfo.repassword
                "
            >
                免费注册
            </button>
        </div>
        <div>
            <a class="a" href="javascript:;">隐私条款</a>
            <input type="checkbox" v-model='checked'>
            <span style="color: var(--red);margin-left:10px">{{message}}</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { log } from "console";
import { ref, reactive, computed, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let loading = ref(false);

let status = ref(0);
// 验证码
let value1 = ref(1);
let value2 = ref(0);

let checked = ref(false)
let message = ref('')
const userinfo = reactive({
    username: "",
    password: "",
    repassword: "",
});
function clear(): void {
    userinfo.username = "";
    userinfo.password = "";
    userinfo.repassword = "";
    value2.value = 0;
    checked.value = false;
    message.value = ''
}
let verify = computed(() => {
    return (
        value1.value == value2.value && userinfo.username && userinfo.password &&checked.value
    );
});
async function submit() {
    loading.value = true;
    try {
        loading.value = false;
        clear();
        // if (data.token) {
        //     localStorage.setItem("token", data.token);
        router.push("/home");
        // } else {
        //     localStorage.removeItem("token");
        // }
    } catch (e) {
        console.log(e);
        loading.value = true;
        clear();
    }
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
        }
    }
    .input {
        position: relative;
        justify-content: center;
        margin: 20px 0;
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
        margin: 0px 2px 0px 20px ;
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