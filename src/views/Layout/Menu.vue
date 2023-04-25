<template>
        <div>

            <!-- 首页导航条 -->
            <el-menu :default-active="route.path" class="el-menu-demo elmenu" mode="horizontal"
                background-color="#212329" text-color="#fff"  active-text-color="#ff6400" @select="handleSelect" router>
                <a href="#" @click="returnIndex"><img src="../../assets/liepin.png" alt="" class="logoimg"></a>
                <el-menu-item index="/" style="margin-left:20px;">首页</el-menu-item>
                <el-menu-item index="/position">职位</el-menu-item>
                <span @click="hrLogin" class="hr-login">我是HR</span>
                <div style="width:350px;height:100%"></div>
                <el-menu-item index="/login" v-if="!isLogin">登录/注册</el-menu-item>
                 <!--  -->
                 <div class="notify" v-if="isLogin">
                    <el-icon color="#fff" size="20"><Bell /></el-icon>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" @command="handleCommand" v-if="isLogin">
                    <span class="el-dropdown-link" >
                        你好！<i class="nickname">{{userInfo.username}}</i>
                    </span>
                    <template #dropdown >
                        <el-dropdown-menu >
                            <el-dropdown-item command="myresume">我的简历</el-dropdown-item>
                            <el-dropdown-item command="apply">我的投递</el-dropdown-item>
                            <el-dropdown-item command="favor">我的收藏</el-dropdown-item>
                            <el-dropdown-item command="setting">账号设置</el-dropdown-item>
                            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <!-- 用户头像 -->
                <div class="user-avator" v-if="isLogin">
                    <el-image :src="userInfo.avatar" alt class="avatorimg"></el-image>
                    <!-- <img src="../../assets/baseavatar.jpg" alt class="avatorimg" /> -->
                </div>

            </el-menu>
        </div>


</template>

<script>
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export default {

    setup() {

        // 登录状态
        const isLogin = ref(false)

        const userInfo = ref({})

        // 获取当前路由
        const route = useRoute()

        // 路由
        const router = useRouter()

        // 点击LOGO返回首页
        const returnIndex = () => {
            router.push("/")
        }
        // 跳转hr登录页面
        const hrLogin= ()=>{
            router.push({
                name:'login',
                query:{
                    type:3
                }
            })
        }

        // 获取用户信息
        const getUserInfo=()=>{
            const hh = sessionStorage.getItem('userInfo')
            if(hh){
              userInfo.value = JSON.parse(hh)
              isLogin.value = true 
            }
       
            
        }

        // 下拉菜单点击事件
        const handleCommand = (command) => {
            if (command == 'loginout') {
                sessionStorage.clear()
                router.push('/login')
            }
            if (command == 'myresume') {
                router.push('/resume')
            }
            if (command == 'apply') {
                router.push('/apply')
            }
            if (command == 'favor') {
                router.push('/favor')
            }
            if (command == 'setting') {
                router.push('/setting')
            }
        }

        // 获取菜单当前的Index
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }

        onMounted(()=>{
            getUserInfo()
        })

        return {
            route,
            router,
            isLogin,
            userInfo,
            hrLogin,
            getUserInfo,
            returnIndex,
            handleCommand,
            handleSelect
        }
    },



}

</script>

<style lang="less" scoped>


.elmenu li {
    width: 100px;
    font-weight: 500;
    font-size: 16px;
}

.el-menu-demo li:hover{
    font-weight: 800;
    
}

.notify{
    float: right;
    margin: auto;
   cursor: pointer;
}

.nickname {
   font-style: normal;
   font-size: 16px;
}

.nickname:hover{
    color: #ff6400;
}

.user-avator {
    float: right;
    margin-right: 180px;
    .avatorimg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-top: 10px;
        margin-left: 10px;
    
    }
}

.user-name {
    span {
        cursor: pointer;
        color: #fff;
        margin-top: 20px;
        height: 26px;
        width: 150px;
    
    }
}

.logoimg {
    width: 97px;
    height: 36px;
    margin-top: 10px;
    margin-left: 150px;
}

.hr-login{
    color: #fff;
    line-height: 57px;
    width: 100px;
    cursor: pointer;
}
</style>