import axiosInstance from '@/utils/http'

export function GtaphList (){
    return axiosInstance({
        url:'list',
    })
}
