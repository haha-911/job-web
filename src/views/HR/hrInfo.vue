<template>
    <div>
        <!-- 基本信息 -->
        <div class="baseInfo">
            <div class="avatar">
                <el-tooltip class="box-item" effect="light" content="点击修改头像" placement="top">
                    <el-image :src="userInfo.avatar" class="img" @click="updateAvatar"></el-image>
                </el-tooltip>
            </div>
            <div class="avatar-right">
                <div class="username">
                    <h2 style="float:left">{{ userInfo.nickname }}</h2>
                </div>
                <div>{{ userInfo.username }}</div>

                <div class="icon-text">
                    <ul>
                        <li>
                            <el-icon :size="13">
                                <Iphone />
                            </el-icon><span>{{ userInfo.tel }}</span>
                        </li>
                        <li>
                            <el-icon :size="13">
                                <Message />
                            </el-icon><span>{{ userInfo.email }}</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="but">
                <button @click="updateUserInfo">编辑个人信息</button>
                <button @click="updatePwd">修改密码</button>
                <button @click="updateCompany">编辑公司信息</button>
                <button @click="logout">退出登录</button>
            </div>
        </div>


        <div class="company">
            <div class="info">
                <h3>{{ companyInfo.name }}【{{ companyInfo.foreignName }}】</h3>
                <p>{{ companyInfo.city }}</p>
                <span>公司使命：</span>
                <p>{{ companyInfo.mission }}</p>
                <span>公司简介：</span>
                <p>{{ companyInfo.description }}</p>
            </div>
            <el-image :src="companyInfo.logo" class="logo"></el-image>
        </div>

        <!-- 编辑头像 -->
        <el-dialog v-model="avatarVisible" title="上传头像" width="30%" center>
            <el-upload class="avatar-uploader" action="/api/file/upload" :headers="headerObject" :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="upload-avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="avatarVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleAvatar">确认</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 编辑公司信息 -->
        <el-dialog v-model="companyVisible" :title="title" width="40%">
            <el-form ref="formRef" :model="companyInfo" label-width="80px">
                <el-form-item label="公司名称" prop="name">
                    <el-input v-model="companyInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="外文名称" prop="foreign">
                    <el-input v-model="companyInfo.foreignName"></el-input>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-input v-model="companyInfo.city"></el-input>
                </el-form-item>
                <el-form-item label="公司使命">
                    <el-input type="textarea" rows="2" v-model="companyInfo.mission"></el-input>
                </el-form-item>
                <el-form-item label="LOGO">
                    <el-upload class="avatar-uploader" action="/api/file/upload" :on-success="handleAvatarSuccess"
                        :headers="headerObject">
                        <img v-if="imageUrl" :src="imageUrl" class=c-logo>
                        <img v-else-if="companyInfo.logo" :src="companyInfo.logo" class="c-logo">
                        <div v-else>
                            <el-icon class="avatar-uploader-icon">
                                <Upload />
                            </el-icon>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="公司简介">
                    <el-input type="textarea" rows="5" v-model="companyInfo.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="handleCompany">表单提交</el-button>
                    <el-button type="info"  @click="restData">重置</el-button>
                    <el-button  @click="companyVisible = false">取消</el-button>
                </el-form-item>
            </el-form>  
        </el-dialog>

        <!-- 编辑用户信息 -->
        <el-dialog v-model="userVisible" title="编辑用户信息" width="30%">
            <el-form ref="formRef" :model="userInfo" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username" disabled ></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="号码" prop="city">
                    <el-input v-model="userInfo.tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input  v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="handleUser">表单提交</el-button>
                    <el-button type="info"  @click="restData">重置</el-button>
                    <el-button  @click="userVisible = false">取消</el-button>
                </el-form-item>
            </el-form>  
        </el-dialog>

        <!-- 修改密码 -->
         <el-dialog v-model="pwdVisible" title="修改密码" width="30%">
            <el-form ref="ruleFormRef" :model="pwdForm" :rules="rules" label-width="80px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="旧密码" prop="oldPwd">
                    <el-input v-model="pwdForm.oldPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="pwdForm.newPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="confirmPwd">
                    <el-input v-model="pwdForm.confirmPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="pwdVisible = false">取消</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                    <el-button type="primary" @click="handlePwd(ruleFormRef)">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import api from '@/api/hr'
import { UserFilled } from '@element-plus/icons-vue';
import { useRoute,useRouter } from 'vue-router';

const avatarVisible = ref(false)
const companyVisible = ref(false)
const userVisible = ref(false)
const pwdVisible = ref(false)
const isAddCompany = ref(false)
const title = ref('')
const imageUrl = ref('')
const headerObject = {
    token: sessionStorage.getItem("token")
}

const userInfo = ref({})
const companyInfo = ref({})
const pwdForm = ref({})

const router = useRouter()

const ruleFormRef = ref(FormInstance)

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入新密码'))
    } else {
        if (pwdForm.value.confirmPwd !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('confirmPwd', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== pwdForm.value.newPwd) {
        callback(new Error("两次密码不一致！"))
    } else {
        callback()
    }
}
const rules = reactive({
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 3, max: 6, message: '昵称为3-6个字符', trigger: 'blur' },
    ],
    tel: [
        { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
        }
    ],
    oldPwd: [
        { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    newPwd: [{ validator: validatePass, trigger: 'blur' }],
    confirmPwd: [{ validator: validatePass2, trigger: 'blur' }],
})


const getUserInfo = () => {
    const hh  = JSON.parse(sessionStorage.getItem('userInfo'))
    if(hh){
        userInfo.value = hh
        getCompanyInfo()
    }else{
        ElMessage.error('未登录，或登录已过期！')
        router.push({ path: '/login', query: { type: 3 } })
    }
    
}
const getCompanyInfo = () => {
    if(userInfo.value.companyId){
        api.getCompany(userInfo.value.companyId).then((result) => {
        companyInfo.value = result.data
    })
    }else{
        isAddCompany.value = true
        companyVisible.value = true 
        title.value= '请完善公司信息'

    }
    
}

const logout = () => {
    sessionStorage.clear()
    router.push({ path: '/login', query: { type: 3 } })


}
const updateAvatar = () => {
    imageUrl.value = ''
    avatarVisible.value = true
}
const handleAvatar = () => {
    avatarVisible.value = false
    const requestData = {
        id: userInfo.value.id,
        avatar: imageUrl.value
    }
    user.updateAvatar(requestData).then((result) => {
        ElMessage.success("上传成功！审核中。。")
    }).catch((err) => {

    });
}

const handleAvatarSuccess = (respose) => {
    imageUrl.value = respose.msg
}

const updateCompany = () =>{
imageUrl.value = ''
title.value = "修改公司信息"
isAddCompany.value = false
companyVisible.value = true
}

const handleCompany = () =>{
    companyInfo.value.logo = imageUrl.value
    if(isAddCompany.value){
        companyInfo.value.hrId = userInfo.value.id
        api.addCompany(companyInfo.value).then((result) => {
            ElMessage.success(result.msg)
        }).catch((err) => {
            
        });

    }else{
        api.updateCompany(companyInfo.value).then((result) => {
        ElMessage.success(result.msg)
        getCompanyInfo()
    }).catch((err) => {  
    });
    }
    companyVisible.value = false
}
const updateUserInfo = () =>{
userVisible.value = true
}

const handleUser = () =>{
    const requestData  ={
        id:userInfo.value.id,
        nickname:userInfo.value.nickname,
        email:userInfo.value.email,
        tel:userInfo.value.tel,
    }
    api.updateUser(requestData).then((result) => {
        ElMessage.success(result.msg)
    }).catch((err) => {  
    });
    userVisible.value = false
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo.value))
}

const updatePwd = () =>{
    pwdForm.value= {}
    pwdVisible.value = true
}

const handlePwd = (formEl) =>{
    if (!formEl) return
     formEl.validate((valid, fields) => {
        if (valid) {
            pwdVisible.value = false
            pwdForm.value.id = userInfo.value.id
                api.changePwd(pwdForm.value).then((result) => {
                    ElMessage.success(result.msg+"请重新登录！")
                    sessionStorage.clear()
                    router.push({path:'/login',query:{type:3}})
                }).catch((err) => {
                    
                });    
            }
    })
}


onMounted(() => {
    getUserInfo()
})


</script>

<style lang="less" scoped>
.avatar-uploader {
    text-align: center;
    margin: auto;

    .upload-avatar {
        margin: auto;
        width: 300px;
        height: 180px;
    }
}

.c-logo{
    width: 300px;
    height: 200px;
    border-radius: 10px;
}
.company {
    width: 100%;
    margin-top: 30px;
    border-radius: 10px;
    background-color: #faf9f9;
    height: 260px;

    .info {
        float: left;
        margin-top: 20px;
        margin-left: 20px;
        width: 580px;
        height: auto;

        span {
            font-size: 16px;
            font-weight: 800;
        }

        p {
            margin-top: 10px;
            margin-bottom: 10px;
            font-size: 15px;
            line-height: 20px;
        }
    }

    .logo {
        float: right;
        margin-right: 30px;
        margin-top: 20px;
        width: 300px;
        height: 200px;
        border-radius: 10px;
    }
}

.baseInfo {
    border-radius: 10px;
    background-color: #faf9f9;
    width: 100%;
    height: 120px;

    .avatar-right {
        margin-top: 20px;
        width: 400px;
        float: left;

        li {
            float: left;
            margin-right: 20px;

            span {
                font-size: 15px;
                margin-left: 2px;
            }

        }

        .username {
            width: 100%;
            height: 30px;
        }

        .icon-text {
            height: 20px;
            margin-top: 10px;
        }
    }

    .avatar {
        margin-top: 20px;
        margin-left: 20px;
        width: 100px;
        height: 100px;
        float: left;
        cursor: pointer;

        .img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
    }

    .but {
        float: right;
        margin-right: 30px;
        width: 300px;

        button {
            float: left;
            width: 120px;
            height: 35px;
            outline: none;
            border: none;
            background-color: #fff;
            border-radius: 50px;
            color: #ff6400;
            margin-top: 18px;
            margin-right: 20px;
            cursor: pointer;
        }
    }

}

</style>