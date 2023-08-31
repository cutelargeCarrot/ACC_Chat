<template>
    <div class="Chat flex">
        <div class="answer" v-html="infor">

        </div>
        <div class="ask flex">
            <input type="text" v-model="userask" placeholder="输入内容点击提交" />
            <button @click="ask" :disabled='!userask'>提交</button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";

let infor = ref(``)
let userask = ref('')
function ask (){
infor.value += `<p>user : ${userask.value}</p>`
if(userask.value)send()
userask.value = ''
}
 function send(){
    const source = new EventSource('http://localhost:3000/stream')
    source.onopen = (data) =>{
        console.log("Connected",data)
    }
    source.onmessage = (res) =>{
        console.log("onmessage",res.data)
        infor.value += `<p>Rob : ${res.data}</p>`
    }
    source.onerror = (e) => {
        console.log("onerror", e, EventSource.CLOSED, EventSource.CONNECTING);
    }
}
</script>

<style lang='scss' scoped>
.Chat {
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .answer{
        margin: 20px 0;
        width: 80%;
        flex: 1;
        border: 1px solid var(--borderColor);
        overflow: auto;
    }
    .ask{
        width: 80%;
        height: 50px;
        margin-bottom: 20px;
        input{
            flex: 1;
            padding: 0 10px;
            outline: 0;
            border: 1px solid var(--color);
        }
        button{
            width: 75px;
            background-color: var(--borderColor);
            color: var(--background);
            border: 1px solid var(--borderColor);
            opacity: 1;
        }
        button:disabled{
            opacity: 0.6;
        }
    }

}
</style>