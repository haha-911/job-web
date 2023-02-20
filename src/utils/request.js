import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";


const service = axios.create({
    timeout: 5000
})

service.interceptors.request.use(
    config => {
    let token=sessionStorage.getItem("token");
    if(token!=null){
        config.headers.token=token
    }
        return config;
    },
   
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(

    response => {
        const res = response.data

        if (res.success) {
            return res
        }

        if (!res.success) {
            ElMessage.error(res.msg)
        }

        if (res.code == 208) {
            router.push('/login')
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
