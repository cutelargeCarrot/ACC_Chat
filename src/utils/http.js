import axios from 'axios'
import {openError} from '@/hooks/usePOP'
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
async function refreshToken() {
    console.log(`Bearer ${localStorage.getItem('refresh_token')}`)
        const res = await axios.get('http://127.0.0.1:3000/user/refresh', {
            params: {
                refreshToken: localStorage.getItem('refresh_token')
            }
        });

        localStorage.setItem('access_token', res.data.data.access_token || '');
        localStorage.setItem('refresh_token', res.data.data.refresh_token || '');
        return res;
      }
// 响应拦截器
axiosInstance.interceptors.response.use(res=>res.data,async e=>{

    if(e.response.status === 401 && !e.config.url.includes('/user/refresh')){

        const res = await refreshToken()
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
