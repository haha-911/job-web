
import service from "@/utils/request";


const api_name = '/api/job/user'

const user = {

    updateAvatar(data){
        return service({
            url:`${api_name}/avatar`,
            method:'put',
            data:data
        })
        
    },
    updateUser(data){
        return service({
            url:`${api_name}/update`,
            method:'put',
            data:data
        })
        
    },
    changePwd(data){
        return service({
            url:`${api_name}/changePwd`,
            method:'put',
            data:data
        })
        
    },
    getUserInfo(){
        return service({
            url:`/api/getUser`,
            method:'post'
        })
    }

   
}

export default user;
