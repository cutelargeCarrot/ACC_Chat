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
        url:'/api/register',
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

// 获取验证码
export function GetCode(address){
    return axiosInstance({
        url:`/email/register-captcha?address=${address}`,
    })
}