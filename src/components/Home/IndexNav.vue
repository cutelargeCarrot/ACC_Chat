<template>
    <div class="flex NavBox">
        <nav class="flex">
            <router-link class="left flex" active-class="active" to="/home/news"
                >首页</router-link
            >
            <router-link class="left flex" active-class="active" to="/home/chat"
                >会话</router-link
            >
            <router-link class="left flex" active-class="active" to="/home/user"
                >用户</router-link
            >
        </nav>
        <div class="right flex pointer" @click="exitflag = !exitflag">退出</div>
        <Teleport to="body">
            <div class="pop" v-if="exitflag">
                <span>是否退出？</span>
                <button @click="exit('/login')">确定</button>
                <button @click="exitflag = !exitflag">取消</button>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
let exitflag = ref<Boolean>(false);
const router = useRouter();

function jump(path: string): void {
    router.push(path);
}

function exit(path: string): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push(path);
}
</script>

<style lang="scss" scoped>
.NavBox {
    justify-content: center;
    width: 100%;
    background-color: var(--borderColor);
    width: 100%;
    height: 50px;
    nav {
        width: 1000px;
        height: 100%;
        justify-content: left;
        color: var(--white);
        .left {
            justify-content: center;
            align-items: center;
            height: 100%;
            min-width: 60px;
            max-width: 120px;
            flex: 1;
            color: var(--background);
        }

        .active {
            background-color: var(--background);
            height: 50px;
            color: var(--color);
        }
    }
    .right {
        justify-content: center;
        align-items: center;
        height: 100%;
        min-width: 60px;
        color: var(--white);
    }
}
.pop {
    position: absolute;
    z-index: 100;
    width: 400px;
    height: 150px;
    top: calc(50% - 75px);
    left: calc(50% - 200px);
    background-color: var(--background2);
    border: 1px solid var(--borderColor);
    color: var(--color);
    padding: 20px;
    span {
        display: block;
        margin: 20px 50px;
    }
    button {
        width: 100px;
        margin-left: 50px;
    }
}
</style>