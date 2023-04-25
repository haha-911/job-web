import axios from "axios";

import service from "@/utils/request";

const api_name = '/api/job'

const api = {

    getPositionList(data){
        return service({
            url:`${api_name}/position/get/job`,
            method:'post',
            data:data
            
        })
    },
    getHotPosition(){
        return service({
            url:`${api_name}/position/hotPos`,
            method:'post'       
        })
    },
    getHotCompany(){
        return service({
            url:`${api_name}/company/hotCom`,
            method:'post'       
        })
    },
    getCategoryList(){
        return service({
            url:`${api_name}/category/all`,
            method:'get'
        })
    },
    getPositionById(id){
        return service({
            url:`${api_name}/position/get/${id}`,
            method:'get'
        })
    },
    getCompanyById(id){
        return service({
            url:`${api_name}/company/get/${id}`,
            method:'get'
        })
    },
    getPositionCountByCompany(id){
        return service({
            url:`${api_name}/position/get/count/${id}`,
            method:'get'
        })
    },

    getExpectByUserId(id){
        return service({
            url:`${api_name}/resume/expect/${id}`,
            method:'get',
        })
    },

    getApplyList(id,data){
        return service({
            url:`${api_name}/application/user/${id}`,
            method:'post',
            data:data
        })
    },
    addApply(data){
        return service({
            url:`${api_name}/application/add`,
            method:'post',
            data:data
        })
    },
    delApply(id){
        return service({
            url:`${api_name}/application/del/${id}`,
            method:'delete',
        })
    },
    isApply(data){
        return service({
            url:`${api_name}/application/isApply`,
            method:'post',
            data:data
        })
    },

    getInterview(id,data){
        return service({
            url:`${api_name}/interview/user/${id}`,
            method:'post',
            data:data
        })
    },

   
}

export default api;

