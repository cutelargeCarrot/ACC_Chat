import axios from 'axios'
import {openError} from '@/hooks/usePOP'
import { RefreshToken } from '../apis/loginApis'
const axiosInstance = axios.create({
    baseURL:'http://172.24.224.1:3000',
    timeout:5000
})


// 请求拦截器
axiosInstance.interceptors.request.use(config=>{
    //token
    const token = localStorage.getItem('access_token')
    if(token) config.headers.Authorization = 'Bearer '+token

    return config
},e=> Promise.reject(e)) 

// refreshToken
async function refreshtoken() {
        const res = await RefreshToken()
        localStorage.setItem('access_token', res.data.access_token || '');
        localStorage.setItem('refresh_token', res.data.refresh_token || '');
        return res;
      }
// 响应拦截器
axiosInstance.interceptors.response.use(async res=>{
  if(res.data.status == 401 && !res.config.url.includes('/user/refresh_token')){
    // 重定向中断URL
    const ReUrl = res.config.url
    const Res = await refreshtoken()
    if(Res.status === 200) {
        return axiosInstance(ReUrl);
      } else {
        openError('登录过期，请重新登录');
        return Promise.reject(Res.data)
      }
    } else {
      return res.data;
    }
},async e=>{
    console.log(e)
    if(
      e.response.status === 401 &&
       !e.config.url.includes('refresh_token')){

        const res = await refreshtoken()
        if(res.status === 200) {
            return axiosInstance(e.config);
          } else {
            openError('登录过期，请重新登录');
            return Promise.reject(res.data)
          }
            
        } else {
          return error.response;
        }
    })


export default axiosInstance
