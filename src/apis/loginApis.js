import axiosInstance from '@/utils/http'

//用户登录
export function Login(data){
    return axiosInstance({
        url:'/user/login',
        method:'POST',
        data
    })
}
//管理员登录
export function AdminLogin(data){
    return axiosInstance({
        url:'/user/login',
        method:'POST',
        data
    })
}
//注册
export function Sign(data){
    return axiosInstance({
        url:'/user/register',
        method:'POST',
        data
    })
}
// 找回密码
export function FindPassword(data){
    return axiosInstance({
        url:'/user/updatePassword',
        method:'POST',
        data
    })
}

// 刷新token
export function RefreshToken(){
    return axiosInstance({
        url:`/user/refresh_token?refresh_token=${localStorage.getItem('refresh_token')}`
    })
}