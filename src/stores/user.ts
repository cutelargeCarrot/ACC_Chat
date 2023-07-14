import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useuserinfoStore = defineStore('userinfo', () => {
 state:()=>({
   username : '',
   email : ''
 })
})

