<template>
    <div class="flex NavBox">
        <nav class="flex">
            <div class="left flex">会话</div>
            <div class="right flex" @click="jump('/user')">用户</div>
            <div class="right flex" @click="exit('/login')">退出</div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()

function jump(path:string):void{
    router.push(path)
}

function exit(path:string):void{
    localStorage.removeItem('token')
    router.push(path)
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
        width: 1200px;
        height: 100%;
        justify-content: space-between;
        color: var(--white);
        div {
            justify-content: center;
            align-items: center;
            height: 100%;

        }
        .left {
            flex: 4;
        }
        .right {
            flex: 2;
        }
    }
}
</style>