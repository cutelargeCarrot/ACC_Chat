<template>
  <div class="search FSizeS">
    username:<input type="text" name="" v-model="searchInfo.username" id="">
    nickname:<input type="text" name="" v-model="searchInfo.nickname" id="">
    email:<input type="text" name="" v-model="searchInfo.email" id="">
    <button @click="clear">cls</button>
    <button @click="search">search</button>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'

const emits = defineEmits(['controlSearch'])

const searchInfo = reactive({
    username:'',
    nickname:'',
    email:''
})

function clear (){
    searchInfo.username = ''
    searchInfo.nickname = ''
    searchInfo.email = ''
}

function search (){
    emits('controlSearch',searchInfo)
}

</script>

<style lang="scss" scoped>
    .search{
        color: var(--borderColor);
        padding: 20px;
        input{
            margin: 0 20px;
        }
    }
</style>