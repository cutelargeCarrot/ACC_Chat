<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {provide} from 'vue'
import * as echarts from 'echarts'

provide("echarts",echarts)


</script>


<style lang='scss'>

</style>
