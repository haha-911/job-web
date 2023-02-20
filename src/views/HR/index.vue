<template>
    <div class="hr">
        <div class="menu">

            <h2>HR管理界面</h2>
            <span :class="{'span-color':tf.isUser}" @click="goInfo">个人信息</span>
            <span :class="{'span-color':tf.isApply}" @click="goApply">申请管理</span>
            <span :class="{'span-color':tf.isPos}" @click="goPosition">职位管理</span>
            <span :class="{'span-color':tf.isInter}" @click="goInter" >面试管理</span>
        </div>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from '@vue/runtime-core'
import  { useRoute, useRouter } from 'vue-router'

const Router = useRouter()
const Route = useRoute()

const tf = reactive({
    isUser:false,
    isApply:false,
    isPos:false,
    isInter:false
})

const clear = () =>{
    Object.keys(tf).map(key=>{
        delete tf[key]
    })
}
const goInfo = () =>{
    clear()
    Router.push('/hrindex')
    tf.isUser = true
}
const goApply = (event) =>{
    clear()
    Router.push('/happly')
    tf.isApply = true
}

const goPosition = () =>{
    clear()
    Router.push('/hposition')
    tf.isPos = true
}

const goInter = () =>{
    clear()
    Router.push('/hinter')
    tf.isInter = true
}

onMounted(()=>{

})
</script>


<style lang="less" scoped>
.hr {
    width: 80%;
    height: 500px;
    margin: auto;
    margin-top: 30px;
    background-color: #fff;
    border-radius: 10px;
}

.menu {
    width: 180px;
    height: 100%;
    border-right: 2px solid #e6eaf1;
    float: left;

    h2 {
        margin-top: 30px;
        margin-bottom: 20px;
    }

    span {
        float: left;
        width: 180px;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
    }

    span:hover {
       font-weight: 600;
    }
}

.span-color{
    background-color: #faf9f9;
    font-weight: 800;
    font-size: 18px;
}

.content {
    text-align: left;
    margin-right: 20px;
    width: 80%;
    margin-top: 50px;
    float: right;
}
</style>