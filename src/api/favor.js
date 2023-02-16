
import service from "@/utils/request";


const api_name = '/api/job/favor'

const favor = {

    getFavor(userId,positionId){
        return service({
            url:`${api_name}/get/${userId}/${positionId}`,
            method:'get',
        })
    },
    cancelFavor(userId,positionId){
        return service({
            url:`${api_name}/cancel/${userId}/${positionId}`,
            method:'delete',
        })
    },
    addFavor(data){
        return service({
            url:`${api_name}/add`,
            method:'post',
            data:data
        })
    },
    delFavor(id){
        return service({
            url:`${api_name}/del/${id}`,
            method:'delete',
        })
    },
    getUserFavor(userId,data){
        return service({
            url:`${api_name}/user/${userId}`,
            method:'post',
            data:data
        })
    },
}

export default favor;
