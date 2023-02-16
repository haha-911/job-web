import axios from "axios";
import service from "@/utils/request";


const api_resume = '/api/job/resume'

const api_exper = '/api/job/exper'

const api_edu = '/api/job/edu'

const api_pro = '/api/job/project'

const api = {

    updateAvatar(data){
        return service({
            url:`/api/job/user/avatar`,
            method:'put',
            data:data
        })
        
    },

    getResumeByUserId(id){
        return service({
            url:`${api_resume}/user/${id}`,
            method:'get',
        })
    },
    updateResumeInfo(data){
        return service({
            url:`${api_resume}/update`,
            method:'put',
            data:data
        })
    },
    addResumeInfo(data){
        return service({
            url:`${api_resume}/add`,
            method:'post',
            data:data
        })
    },
   
    getExperByResumeId(id){
        return service({
            url:`${api_exper}/${id}`,
            method:'get',
        })
    },
    addExperience(data){
        return service({
            url:`${api_exper}/add`,
            method:'post',
            data:data
        })
    },
    updateExperience(data){
        return service({
            url:`${api_exper}/update`,
            method:'put',
            data:data
        })
    },
    deleteExperience(id){
        return service({
            url:`${api_exper}/del/${id}`,
            method:'delete',
        })
    },



    getEduByResumeId(id){
        return service({
            url:`${api_edu}/${id}`,
            method:'get',
        })
    },
    addEducation(data){
        return service({
            url:`${api_edu}/add`,
            method:'post',
            data:data
        })
    },
    updateEducation(data){
        return service({
            url:`${api_edu}/update`,
            method:'put',
            data:data
        })
    },
    deleteEducation(id){
        return service({
            url:`${api_edu}/del/${id}`,
            method:'delete',
        })
    },

    getProjectByResumeId(id){
        return service({
            url:`${api_pro}/${id}`,
            method:'get',
        })
    },
    addProject(data){
        return service({
            url:`${api_pro}/add`,
            method:'post',
            data:data
        })
    },
    updateProject(data){
        return service({
            url:`${api_pro}/update`,
            method:'put',
            data:data
        })
    },
    deleteProject(id){
        return service({
            url:`${api_pro}/del/${id}`,
            method:'delete',
        })
    },
   
}


export default api;



