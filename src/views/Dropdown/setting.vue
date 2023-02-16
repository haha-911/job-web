<template>
    <div class="s-body" >

        <div class="s-left" >
            <span class="title">账号设置</span>
            <span :class="{'isFixed':tf.isName}" @click="editName">我的昵称</span>
            <span :class="{'isFixed':tf.isTel}" @click="editTel">手机号码</span>
            <span :class="{'isFixed':tf.isEmail}" @click="editEmail">我的邮箱</span>
            <span :class="{'isFixed':tf.isPwd}" @click="editPwd">密码设置</span>
        </div>

        <div class="s-right">

            <div class="nickname">
                <h3>我的昵称</h3>
                <p>当前昵称:{{userInfo.nickname}}</p>
                <button @click="editName">修改昵称</button>
            </div>
            <div class="nickname">
                <h3>手机号码</h3>
                <p>当前号码:{{userInfo.tel}}</p>
                <button @click="editTel">修改号码</button>
            </div>
            <div class="nickname">
                <h3>我的邮箱</h3>
                <p>当前邮箱:{{userInfo.email}}</p>
                <button @click="editEmail">修改邮箱</button>
            </div>
            <div class="nickname">
                <h3>密码设置</h3>
                <p>登录用户:{{userInfo.username}}</p>
                <button @click="editPwd">修改密码</button>
            </div>
        </div>
        <!-- 编辑框 -->
        <el-dialog v-model="tf.dialogVisible" :title="title" width="30%">
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="用户昵称" prop="nickname" v-if="tf.isName">
                    <el-input v-model="form.nickname" />
                </el-form-item>
                <el-form-item label="手机号码" prop="tel" v-if="tf.isTel">
                    <el-input v-model="form.tel" />
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email" v-if="tf.isEmail">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPwd" v-if="tf.isPwd">
                    <el-input v-model="form.oldPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd" v-if="tf.isPwd">
                    <el-input v-model="form.newPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="confirmPwd" v-if="tf.isPwd">
                    <el-input v-model="form.confirmPwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="tf.dialogVisible = false">取消</el-button>
                    <el-button type="info" @click="resetForm(ruleFormRef)">重置</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, reactive } from '@vue/reactivity'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import api from '@/api/user'
import { onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { bus } from 'vue3-eventbus'


const title = ref('修改昵称')
const tf = reactive({
    dialogVisible: false,
    isEmail:false,
    isPwd:false,
    isName:false,
    isTel:false,
    needFixed:false,
})

const form = reactive({
    id:0,
    nickname: '',
    email: '',
    tel: '',
    oldPwd: '',
    newPwd: '',
    confirmPwd: ''
})

const clear = () => {
    Object.keys(form).map(key => {
      delete form[key]
    })

    Object.keys(tf).map(key=>{
        tf[key] = false
    })
  }
const editName = () => {
    clear()
    tf.isName = true
    tf.dialogVisible = true
}
const editTel = () => {
    clear()
    title.value = "修改号码"
    tf.isTel = true
    tf.dialogVisible = true
}
const editEmail = () => {
    clear()
    title.value = "修改邮箱"
    tf.isEmail = true
    tf.dialogVisible = true
}
const editPwd = () => {
    clear()
    title.value = "修改密码"
    tf.isPwd = true
    tf.dialogVisible = true
}
const ruleFormRef = ref(FormInstance)

const  userInfo = ref({})

const getUserInfo = () =>{
    api.getUserInfo().then((result) => {
        userInfo.value = result.data
    }).catch((err) => {
        
    });

}

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入新密码'))
    } else {
        if (form.confirmPwd !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('confirmPwd', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== form.newPwd) {
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
        { min: 11, max: 11, message: '格式错误', trigger: 'blur' },
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

const router = useRouter()

const submitForm = (formEl) => {

    if (!formEl) return
     formEl.validate((valid, fields) => {
        if (valid) {
            form.id = userInfo.value.id
            if(!tf.isPwd){
                api.updateUser(form).then((result) => {
                ElMessage.success(result.msg)
                getUserInfo()
            }).catch((err) => {
                
            });
            }
            if(tf.isPwd){
                api.changePwd(form).then((result) => {
                    ElMessage.success(result.msg+"请重新登录！")
                    sessionStorage.clear()
                    router.push('/login')
                }).catch((err) => {
                    
                });
            }
            tf.dialogVisible = false
            clear()
        } 
    })
}

const handleScroll = () =>{
    bus.on('topValue', (top)=>{
          if (top> 100) {
          tf.needFixed = true
        } else {
          tf.needFixed = false
        }
        })
}



const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
onMounted(()=>{
    getUserInfo()
    handleScroll()
})


</script>

<style lang="less" scoped>

.isFixed{
  background-color: #fff4e6;
}
.s-body {
    width: 80%;
    height: 460px;
    margin: 30px auto;
    border-radius: 20px;
    background-color: #fff;
}

.s-left {
    width: 180px;
    height: 100%;
    border-right: 2px solid #e6eaf1;
    float: left;

    .title {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 800;
    }
    .title:hover{
        color:rgb(0, 0, 0)
    }

    span {
        float: left;
        width: 180px;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
    }

    span:hover {
        color: #ff6400;
    }
}

.s-right {

    button {
        width: 100px;
        height: 35px;
        outline: none;
        border: none;
        background-color: #ff6400;
        border-radius: 50px;
        color: #fff;
        margin-bottom: 30px;
    }

    .nickname {
        width: 400px;
       
        border-bottom: 2px solid #e6eaf1;
        margin-left: 30px;
        margin-top: 40px;
        float: left;
        p {
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 13px;
        }

    }

}
</style>