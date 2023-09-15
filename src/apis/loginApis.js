import axiosInstance from '@/utils/http'

//用户登录
export function Login(data){
    return axiosInstance({
        url:'/user/sign_in',
        method:'POST',
        data
    })
}
//管理员登录
export function AdminLogin(data){
    return axiosInstance({
        url:'/user/admin/sign_in',
        method:'POST',
        data
    })
}
//注册
export function Sign(data){
    return axiosInstance({
        url:'/user/sign_up',
        method:'POST',
        data
    })
}
// 找回密码
export function FindPassword(data){
    return axiosInstance({
        url:'/user/update_password',
        method:'POST',
        data
    })
}

// 刷新token
export function RefreshToken(){
    return axiosInstance({
        url:`/user/refresh?refreshToken=${localStorage.getItem('refresh_token')}`
    })
}