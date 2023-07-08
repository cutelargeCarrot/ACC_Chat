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
        background-color: var(--borderColor);
        background-image: linear-gradient(-160deg, var(--color),var(--bgColor));
    }
</style>