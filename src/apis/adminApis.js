import axiosInstance from '@/utils/http'

export function AdminSignIn (data){
    return axiosInstance({
        url:'user/admin/sign_in',
        method:"POST",
        data
    })
}

export function GetUserList (data){
    const {page,pageSize,username,nickname,email} = data
    return axiosInstance({
        url:'user/list',
        params:{
            page,
            pageSize,
            username,
            nickname,
            email
        }
        
    })
}