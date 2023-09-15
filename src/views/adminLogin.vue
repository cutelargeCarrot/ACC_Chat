<template>
    <div class="AdminLogin flex">
        <div class="form flex">
            <span class="title color">管理员登录入口</span>
            <span class="color">username</span
            ><input type="text" v-model="userinfo.username" />
            <span class="color">password</span
            ><input type="text" v-model="userinfo.password" />
            <button class="color" :disabled="loading" @click="adminSignIn">submit</button>
            <router-link class="color" to="/login">返回登录页面</router-link>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { AdminSignIn } from "../apis/adminApis";
import {useRouter} from 'vue-router'
import { reactive, ref } from "vue";
import { openError } from "../hooks/usePOP";
const router = useRouter()
let loading = ref(false)
const userinfo = reactive({
    username: "",
    password: "",
});
async function adminSignIn() {
        loading.value = true;
    try {
        const data = await AdminSignIn(userinfo);
        if(data.status === 400)openError(data.data)
        if (data.data.accessToken) {
            localStorage.setItem("access_token", data.data.accessToken);
            localStorage.setItem("refresh_token", data.data.refreshToken);
            router.push("/home");
        } else {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
        loading.value = false;
    } catch (e) {
        console.log(e);
        openError("登陆失败");
        loading.value = false;
    }
}
</script>

<style lang='scss' scoped>
.color{
  color:var(--borderColor)
}
.AdminLogin {
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
  justify-content: center;
  align-items: center;
  .form{
    flex-direction: column;
    padding: 50px;
    border: 1px solid var(--borderColor);
    border-radius: 20px;
    .title{
      font-size: 1.5em;
      font-weight: bolder;
    }
    span{
      margin: 5px;
    }
    input{
      outline: 0;
      border: 0;
      padding: 5px;
      border-bottom: 1px solid var(--borderColor);
    }
     button{
      border: 1px solid var(--borderColor);
      background-color: var(--background);
      margin: 30px 0;
    }
  }
}
</style>