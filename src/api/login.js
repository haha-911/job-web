import axios from "axios";
import service from "@/utils/request";


const api_name = '/api'

const api = {

    login(data){
        return service({
            url:`${api_name}/user/login`,
            method:'post',
            params:data
        })
    },
    sendCode(data){
        return service({
            url:`${api_name}/sendCode`,
            method:'post',
            params:data
        })
    },

    registry(data){
        return service({
            url:`${api_name}/registry`,
            method:'post',
            data:data
        })
    },
    getUserInfo(){
        return service({
            url:`${api_name}/getUser`,
            method:'post'
        })
    },
    getHRInfo(){
        return service({
            url:`${api_name}/getHR`,
            method:'post'
        })
    }
   
}

export default api;
