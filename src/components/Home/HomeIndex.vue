<template>
<div class="box flex">
    <IndexNav></IndexNav>
    <body class="flex">
        我是body
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
        height: 100vh;
        width: 100vw;
        body{
            justify-content: center;
            align-items: center;
        }
    }
</style>