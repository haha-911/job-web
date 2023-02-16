
import service from "@/utils/request";


const api_name = '/api/job/follow'

const follow = {

    getFollow(userId,companyId){
        return service({
            url:`${api_name}/get/${userId}/${companyId}`,
            method:'get',
        })
    },
    cancelFollow(userId,companyId){
        return service({
            url:`${api_name}/cancel/${userId}/${companyId}`,
            method:'delete',
        })
    },
    addFollow(data){
        return service({
            url:`${api_name}/add`,
            method:'post',
            data:data
        })
    },
    delFollow(id){
        return service({
            url:`${api_name}/del/${id}`,
            method:'delete',
        })
    },
    getUserFollow(userId,data){
        return service({
            url:`${api_name}/user/${userId}`,
            method:'post',
            data:data
        })
    },
}

export default follow;
