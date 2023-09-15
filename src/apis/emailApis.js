import axiosInstance from '@/utils/http'

// 注册验证码
export function SignInCode(address){
    return axiosInstance({
        url:`/email/sign_captcha?address=${address}`,
    })
}
// 修改验证码
export function UpdateInfoCode(address){
    return axiosInstance({
        url:`/email/update_captcha?address=${address}`,
    })
}
// 找回密码
export function UpdatePasswordCode(address){
    return axiosInstance({
        url:`/email/update_password_captcha?address=${address}`,
    })
}