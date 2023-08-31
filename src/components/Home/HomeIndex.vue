<template>
<div class="box flex">
    <IndexNav></IndexNav>
    <body class="flex">
        <router-view></router-view>
    </body>
</div>
</template>

<script setup lang='ts'>
</script>

<style lang='scss' scoped>
    .box{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        body{
            height: calc(100% - 50px);
            overflow: hidden;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            background: var(--background);
        }
    }
</style>