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
        url:'/my/updateinfo',
        method:'POST',
        data
    })
}
// // 更改密码
export function updatePwd(data){
    return axiosInstance({
        url:'/my/updatepwd',
        method:'POST',
        data
    })
}
// // 注销账户
export function cancel(data){
    return axiosInstance({
        url:'/my/cancel',
        method:'POST',
        data
    })
}
