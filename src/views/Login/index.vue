<template>
  <div class="layout">

    <div class="text">
      <span @click="isLogin = true; isAgree = false" :class="{'hover-text':isLogin}">登录</span>
      <span @click="isLogin = isAgree = false" :class="{ 'hover-text': !isLogin }">注册</span>
    </div>

    <div class="lg-style" v-if="isLogin">
      <form action="">


        <input v-model="name" placeholder="用户名" />
        <input v-model="pwd" placeholder="密码" type="password" autocomplete />
      </form>
      <button @click="login" >登录</button>


      <el-row>
        <el-checkbox class="checkBox" v-model="isAgree" name="type">同意用户使用准则</el-checkbox>
      </el-row>


    </div>

    <div class="lg-style" v-if="!isLogin">
      <form action="">

        <input v-model="username" placeholder="用户名" />
        <input v-model="nickname" placeholder="昵称" />
        <input v-model="tel" placeholder="号码" />
        <input v-model="email" placeholder="邮箱" />
        <input v-model="password" type="password" placeholder="密码" autocomplete />
        <input v-model="confirmPassword" placeholder="确认密码" type="password" autocomplete />

      </form>
      <button @click="register">注册</button>

      <el-row>
        <el-checkbox class="checkBox" v-model="isAgree" name="type">同意用户使用准则</el-checkbox>
      </el-row>

    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import api from '@/api/login'
import { useRouter } from "vue-router";
export default {

  setup() {

    const state = reactive({
      isAgree: false,
      isLogin: true,
    })
    const loginForm = reactive({
      name: "",
      pwd: "",
    });

    const registreForm = reactive({
      username: "",
      nickname:'',
      tel:'',
      email: "",
      password: "",
      confirmPassword: "",
    });

    const Router = useRouter()
    // 登录
    function login() {

      if (loginForm.name == "" || loginForm.pwd == "") {
        ElMessage.error("请输入用户名或密码")
        return
      }
      if (state.isAgree == false) {
        ElMessage.error("请勾选阅读协议")
        return
      }

      loginForm.type = 4

      api.login(loginForm).then((result) => {

        const token = result.data
        ElMessage.success(result.msg)
        sessionStorage.setItem("token",token)
        getUserInfo()       
        

      }).catch((err) => {

      });
    }
    // 注册
    function register() {

      if (registreForm.username == '' || registreForm.password == '' || registreForm.email == '' || registreForm.confirmPassword == '') {
        ElMessage.error("请填完整注册表单")
        return
      }
      if (registreForm.confirmPassword !== registreForm.password) {
        ElMessage.error("密码与确认密码不一致.")
        return
      }

      if (state.isAgree == false) {
        ElMessage.error("请勾选阅读协议")
        return
      }
      registreForm.type = 4

      api.registry(registreForm).then((result) => {
        ElMessage.success(result.msg)
        state.isLogin = true

        Object.keys(registreForm).map(key => {
          delete registreForm[key]
        })

      }).catch((err) => {

      });

    }

    // 获取登录用户信息
    function getUserInfo(){
      api.getUserInfo().then((result) => {
        const userInfo = JSON.stringify(result.data)
        sessionStorage.setItem('userInfo',userInfo)
        Router.go(-1)

    // const hh = sessionStorage.getItem('userInfo')

    // if(hh){
    //   Router.replace("/")
    // }else{
    //   console.log("没加载数据");
    // }

      }).catch((err) => {
        
      });
    }

    return {
      ...toRefs(loginForm),
      ...toRefs(registreForm),
      ...toRefs(state),
      login,
      register,
      getUserInfo
    };
  },
}
</script>

<style lang="less" scoped>
.layout {
  position: absolute;
  left: calc(50% - 200px);
  top: 20%;
  width: 340px;
  border: 2px solid gray;
  border-radius: 20px;

  .text {
    font-size: 18px;
    margin-top: 20px;

    span {
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .hover-text {
    font-size: 20px;
    font-weight: 800;
    border-bottom: 3px solid #ff6400;

  }
}

.lg-style {
  width: 280px;
  margin: auto;
  text-align: left;

  input {
    width: 260px;
    height: 35px;
    border-radius: 50px;
    margin-top: 20px;
    outline: none;
    border: 1px solid #ff6400;

  }

  button {
    width: 260px;
    height: 37px;
    border-radius: 50px;
    outline: none;
    border: none;
    margin-top: 20px;
    color: #fff;
    background-color: #ff6400;
  }

  input:hover {
    border: 2px solid #ff6400;
  }
}

.checkBox {
  margin-left: 14px;
}
</style>