<template>
<button @click='open'>上线</button>
<button @click='jump'>心跳</button>
<button @click='close'>下线</button>
<div>
  <div v-for="item in onlineUser" :key="item.username">{{item.username}}</div>
</div>
 <div>
   <div class="chat-div">
    <span 
    v-for="(item,idx) in messageList" 
    :class="{'chat-send':item.type,'chat-receive':!item.type}"
    >
    {{ item.data }}
    </span>
  </div>
  <div class="chat-input">
    <textarea v-model="inputMessage"></textarea>
    <button @click="send">send</button>
  </div>
 </div>
</template>

<script setup lang="ts">
import io, { Socket } from 'socket.io-client'
import {onMounted, reactive, ref} from "vue";
import {getUserinfo} from '../apis/userinfoApis'
// import {message} from "../chat";

const client = io('http://172.24.224.1:8823',{autoConnect:false});
// .connect()
const messageList = reactive([]);
let onlineUser = ref([])

client.on('test',(res)=>{
  console.log(res)
})

client.on('message', (res: string) => {
  messageList.push({type: 0, data: res});
});
client.on('chat', (res: string) => {
  messageList.push({type: 0, data: res});
});

client.on('connection', (res: string) => {

});
client.on('disconnects', (res: string) => {

});

const inputMessage = ref('');
const send = () => {
  messageList.push({type: 1, data: inputMessage.value});
  client.emit('message', inputMessage.value);
  // client.emit('message', {
  //   toUserName:'test',
  //   message:inputMessage.value
  // });
}
const open = () =>{
    client.disconnect()
    client.connect()
}
const jump = () => {
  client.emit('heartbeat',1)
}
const close = () =>{
    client.disconnect()
}

onMounted(async()=>{
  const data = await getUserinfo()
    client.auth = {username:data.data.username}
    // open()
})

</script>

<style scoped >
.chat-div {
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px;
  overflow: auto;
}

.chat-input {
  width: 500px;
  display: flex;


}
  textarea {
    flex-grow: 1;
  }
.chat-send {
  text-align: right;
}

.chat-receive {
  text-align: left;
}
</style>
