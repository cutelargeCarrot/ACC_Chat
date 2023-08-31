<template>
  <div class="News flex">
    <div class="top">
      <p>可以展示一些信息</p>
    </div>
    <div>关于本产品</div>
    <div class="bottom"><p>功能介绍及其他</p></div>

  </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
  .News{
    height: 100%;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
      align-items: center;
    background-color: var(--background);
    .top,.bottom{
      justify-content: center;
      align-items: center;
      margin: 20px 0;
      height: 300px;
      width: 80%;
      border: 1px solid var(--color);
    }
  }
</style>