<template>
    <p class="FSizeB" style="border-color: var(--red); color: var(--red)">
        管理员
    </p>
    <div class="flex divcolorRed">
        <span></span>
    </div>
    <div class="flex">
        <router-link class="border a FSizeS" to="/home/manage"
            >进入</router-link
        >
    </div>
</template>

<script lang='ts' setup>
</script>

<style lang='scss' scoped>
        p {
            width: 100%;
            display: inline-block;
            border-bottom: 1px solid var(--color);
            color: var(--color);
            padding: 10px 0;
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
                flex: 1;
                text-align: left;
            }
            .a{
                color: var(--red);
                border-color: var(--red);
                background-color: transparent;
                width: 50%;
                padding: 10px 20px;
                text-align: center;
            }
        }
</style>