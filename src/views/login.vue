<template>
    <div class="box flex">
         <Login></Login>
    </div>
 
</template>

<script setup lang='ts'>
import Login from '../components/Login/Login.vue'
</script>

<style lang='scss' scoped>
    .box{
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: transparent;
        box-shadow: inset 0 0 100px 0px rgba(83, 0, 192, 0.321),
        inset 0 0 50px 0px rgba(35, 9, 112, 0.651);
    }
    .box::after{
        content: '';
         background-image: conic-gradient( from 180deg at 50% 50%,rgb(78, 65, 143) 5% , rgb(170, 173, 226) 23%,rgb(188, 128, 216) 36% , rgb(154, 160, 212) 52%, rgb(137, 207, 192) 65%,rgb(103, 88, 176) 72%,rgb(78, 65, 143) 98% );
        filter: blur(25px);
        opacity: 0.9;
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: -1;
    }
</style>