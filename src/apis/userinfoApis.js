import axiosInstance from '@/utils/http'

export function getAPI(){
    return axiosInstance({
        url:'home/xx/xx'
    })
}
// 获取用户的基本信息
export function getUserinfo(){
    return axiosInstance({
        url:'/user/info',
    })
}
// 更新用户基本信息
export function updateUserinfo(data){
    return axiosInstance({
        url:'/user/update',
        method:'POST',
        data
    })
}

// 更新用户邮箱信息
export function UpdateEmail(data){
    return axiosInstance({
        url:'/user/update_email',
        method:'POST',
        data
    })
}
// 更新用户密码
export function UpdatePassword(data){
    return axiosInstance({
        url:'/user/update_password',
        method:'POST',
        data
    })
}