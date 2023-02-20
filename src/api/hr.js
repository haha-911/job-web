import service from "@/utils/request";
import { ElMessage } from "element-plus";

const api_name = '/api/job'

const api = {
    getPositionList(data){
        return service({
            url:`${api_name}/position/HR`,
            method:'post',
            data:data
        })
    },
    changePositionState(id,state){
        return service({
            url:`${api_name}/position/state/${id}/${state}`,
            method:'post',
        })
    },
    delPosition(id){
        return service({
            url:`${api_name}/position/del/${id}`,
            method:'delete',
        })
    },
    updatePosition(data){
        return service({
            url:`${api_name}/position/update`,
            method:'put',
            data:data
        })
    },
    addPosition(data){
        return service({
            url:`${api_name}/position/add`,
            method:'post',
            data:data
        })
    },
    getPositionById(id){
        return service({
            url:`${api_name}/position/get/${id}`,
            method:'get',
        })
    },
    getCategory(){
        return service({
            url:`${api_name}/category/all`,
            method:'get',
        })
    },
    getCompany(id){
        return service({
            url:`${api_name}/company/get/${id}`,
            method:'get',
        })
    },
    updateCompany(data){
        return service({
            url:`${api_name}/company/update`,
            method:'put',
            data:data
        })
    },
    addCompany(data){
        return service({
            url:`${api_name}/company/add`,
            method:'post',
            data:data
        })
    },
    updateUser(data){
        return service({
            url:`${api_name}/user/update`,
            method:'put',
            data:data
        })
    },
    changePwd(data){
        return service({
            url:`${api_name}/user/changePwd`,
            method:'put',
            data:data
        })
        
    },
    getApply(data){
        return service({
            url:`${api_name}/application/page`,
            method:'post',
            data:data
        })
        
    },
    passApply(data){
        return service({
            url:`${api_name}/application/pass`,
            method:'post',
            data:data
        })
        
    },
    refuseApply(data){
        return service({
            url:`${api_name}/application/refuse`,
            method:'post',
            data:data
        })
        
    },
    getResumeInfo(id){
        return service({
            url:`${api_name}/resume/${id}`,
            method:'get'
        })
    },
    getInterview(data){
        return service({
            url:`${api_name}/interview/HR`,
            method:'post',
            data:data
        })
    },
    passInterview(data){
        return service({
            url:`${api_name}/interview/pass`,
            method:'post',
            data:data
        })
        
    },
    refuseInterview(data){
        return service({
            url:`${api_name}/interview/refuse`,
            method:'post',
            data:data
        })
        
    },
}


export default api;