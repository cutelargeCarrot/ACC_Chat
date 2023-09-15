import axios from 'axios'
import {openError} from '@/hooks/usePOP'
import { RefreshToken } from '../apis/loginApis'
const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:3000',
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
        localStorage.setItem('access_token', res.data.accessToken || '');
        localStorage.setItem('refresh_token', res.data.refreshToken || '');
        return res;
      }
// 响应拦截器
axiosInstance.interceptors.response.use(async res=>{
  if(res.data.status == 401 && !res.config.url.includes('/user/refresh')){

    const res = await refreshtoken()
    if(res.status === 200) {
        return axiosInstance(res.config);
      } else {
        openError('登录过期，请重新登录');
        return Promise.reject(res.data)
      }
        
    } else {
      return res.data;
    }
},async e=>{
  
    if(e.response.status === 401 && !e.config.url.includes('/user/refresh')){

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
