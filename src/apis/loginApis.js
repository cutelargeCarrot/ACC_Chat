import axiosInstance from '@/utils/http'

//登录
export function Login(data){
    return axiosInstance({
        url:'/api/login',
        method:'POST',
        data
    })
}
//注册
export function Sign(data){
    return axiosInstance({
        url:'/api/reguser',
        method:'POST',
        data
    })
}