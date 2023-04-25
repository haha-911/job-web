<template>
  <div class="layout">


    <div class="left">

      <div class="img_local" v-if="type == 3">
        <h2>我是HR</h2>
        <img src="../../assets/loginbg.jpeg" alt="">

      </div>
      <div class="img_local" v-else>
        <h2>我是用户</h2>
        <img src="../../assets/loginbg.jpeg" alt="">
      </div>

    </div>

    <div class="right">

      <div class="text">
        <span @click="isLogin = true; isAgree = false" :class="{ 'hover-text': isLogin }">登录</span>
        <span @click=" isLogin = isAgree = false " :class=" { 'hover-text': !isLogin } ">注册</span>
      </div>

<!-- 登录 -->
      <div class="lg-style" v-if=" isLogin ">
        <form action="">
          <input v-model=" name " placeholder="用户名" />
          <input v-model=" pwd " placeholder="密码" type="password" autocomplete />
        </form>
        <el-row>
          <el-checkbox class="checkBox" v-model=" isSave " name="type">记住密码</el-checkbox>
          <p style="margin-top:5px;margin-left:90px">忘记密码？</p>
        </el-row>
        <el-row>

        </el-row>

        <button @click=" login ">登录</button>

        <el-row>
          <el-checkbox class="checkBox" v-model=" isAgree " name="type">同意用户使用准则</el-checkbox>
        </el-row>

      </div>

<!-- 注册 -->
      <div class="lg-style" v-if=" !isLogin ">
        <form action="">
          <input v-model=" username " placeholder="用户名" />
          <input v-model=" nickname " placeholder="昵称" />
          <input v-model=" tel " placeholder="号码" />
          <input v-model=" email " placeholder="邮箱" />
          <input v-model=" password " type="password" placeholder="密码" autocomplete />
          <input v-model=" confirmPassword " placeholder="确认密码" type="password" autocomplete />
        </form>
        <button @click=" register ">注册</button>
        <el-row>
          <el-checkbox class="checkBox" v-model=" isAgree " name="type">同意用户使用准则</el-checkbox>
        </el-row>

      </div>

    </div>


  </div>
</template>
<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import api from '@/api/login'
import { useRoute, useRouter } from "vue-router";
import { onMounted } from '@vue/runtime-core';

export default {

  setup() {

    const state = reactive({
      isSave: true,
      isAgree: false,
      isLogin: true,
    })
    const loginForm = reactive({
      name: "",
      pwd: "",
      type: '',
    });

    const registreForm = reactive({
      username: "",
      nickname: '',
      tel: '',
      email: "",
      code: '',
      password: "",
      confirmPassword: "",
    });

    const Router = useRouter()
    const Route = useRoute()
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
      // 记住密码，下次自动登录
      if (state.isSave) {
        const saveLoginInfo = JSON.stringify(loginForm)
        if (loginForm.type == 3) {
          localStorage.setItem("hrInfo", saveLoginInfo)
        } else {
          localStorage.setItem("userInfo", saveLoginInfo)
        }

      } else {
        if (loginForm.type == 3) {
          localStorage.removeItem("hrInfo")
        } else {
          localStorage.removeItem("userInfo")
        }

      }

      // 用户登录
      api.login(loginForm).then((result) => {
        const token = result.data

        ElMessage.success(result.msg)
        sessionStorage.setItem("token", token)

        // 按类型跳转首页
        if (loginForm.type == 4) {
          getUserInfo()
        } else {
          getHRInfo()
        }
      }).catch((err) => { });
    }
    // 注册
    function register() {
      if (registreForm.username == '' || registreForm.password == '' || registreForm.confirmPassword == '') {
        ElMessage.error("请填完整注册表单")
        return
      }
      if (registreForm.email == '' || !registreForm.email.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
        ElMessage.error("请输入邮箱")
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
      registreForm.type = loginForm.type

      api.registry(registreForm).then((result) => {
        ElMessage.success(result.msg)
        state.isLogin = true
        Object.keys(registreForm).map(key => {
          delete registreForm[key]
        })

      }).catch((err) => { });

    }

    // 获取登录用户信息
    function getUserInfo() {
      api.getUserInfo().then((result) => {
        const userInfo = JSON.stringify(result.data)
        sessionStorage.setItem('userInfo', userInfo)
        Router.go(-1)
      }).catch((err) => {

      });
    }

    // 获取登录HR信息
    function getHRInfo() {
      api.getHRInfo().then((result) => {
        const userInfo = JSON.stringify(result.data)
        sessionStorage.setItem('userInfo', userInfo)
        Router.push("/hrindex")
      }).catch((err) => {

      });
    }

    // 获取登录的用户类型
    function getType() {
      const type = Route.query.type
      if (type) {
        loginForm.type = type
        const hrInfo = JSON.parse(localStorage.getItem("hrInfo"))
        if (hrInfo) {
          loginForm.name = hrInfo.name
          loginForm.pwd = hrInfo.pwd
        }
      } else {
        loginForm.type = 4
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if (userInfo) {
          loginForm.name = userInfo.name
          loginForm.pwd = userInfo.pwd
        }
      }
    }


    onMounted(() => {
      getType()
    })

    return {
      ...toRefs(loginForm),
      ...toRefs(registreForm),
      ...toRefs(state),
      getType,
      Route,
      login,
      register,
      getUserInfo,
      getHRInfo,
    };
  },
}
</script>

<style lang="less" scoped>
.layout {
  position: absolute;
  left: 20%;
  top: 20%;
  width: 840px;
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

.left {
  float: left;
  margin-left: 30px;

  .img_local {
    margin: auto;
    width: 400px;

    h2 {
      margin-top: 10px;
    }

    img {
      border-radius: 20px;
      width: 400px;
    }
  }

}

.right {
  float: right;
  margin-right: 30px;
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