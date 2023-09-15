<template>
  <div class="box flex">
    <UserList :resData="resData"></UserList>
     <PagingDevice :page="Info.page" :pageSize="Info.pageSize" :totalCount="resData.totalCount" @controlPage="controlPage" @controlPageSize="controlPageSize"></PagingDevice>
  </div>
</template>

<script lang='ts' setup>
import {onMounted, reactive} from 'vue'
import {GetUserList} from '../apis/adminApis'
import { openError } from '../hooks/usePOP'

const Info = reactive({
  page:1,
  pageSize:10,
  username:'',
  nickname:'',
  email:''
})
const resData = reactive({
  users:[],
  totalCount:0
})
const controlPage = (value)=>{
  Info.page = value
  GetList()
}
const controlPageSize = (value)=>{
  Info.pageSize = value
  GetList()
}
async function GetList() {
 try{
   const data = await GetUserList(Info)
  resData.totalCount = data.data.totalCount
  resData.users = data.data.users
  if(data.status == 401) openError(data.data)
 } catch(e) {
  console.log(e)
 }
}
onMounted(()=>{
  GetList()
})


</script>

<style lang='scss' scoped>
  .box{
    justify-content: center;
    align-items: center;
  }
</style>