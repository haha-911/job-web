<template>
  <div class="d-nav" :class="{ hasFixed: needFixed }">
    <div style="height: 20px"></div>
    <div style="width: 70%; margin: auto">
      <div class="nav-info">
        <h2>{{ positionInfo.title }} <span>{{positionInfo.salaryDown}} - {{positionInfo.salaryUp}}</span></h2>
        <div class="tag">
          <span><el-icon><Location /></el-icon>{{positionInfo.city}}</span>
          <span><el-icon><Clock /></el-icon> {{ positionInfo.releaseDate}}</span>
          <span><el-icon><User /></el-icon> {{ positionInfo.quantity - 1 }}~{{ positionInfo.quantity + 3 }}人</span>
          <span><el-icon><View /></el-icon> {{ positionInfo.hits }}</span>
        </div>
      </div>

      <div class="nav-button">
        <button class="but-left" v-if="isFavor" @click="addFavor"><el-icon color="#ff6400"><Star /></el-icon> &nbsp;收藏职位</button>
        <button class="but-left" v-else @click="cancelFavor"><el-icon size="18" color="#ff6400"><StarFilled /></el-icon> &nbsp;已收藏</button>
        <button class="but-right" v-if="isApply">已投递</button>
        <button class="but-right" @click="addApply" v-else>投递简历</button>
      </div>
    </div>
  </div>

  <div class="d-content">
    <el-row :gutter="20">
      <!-- 左侧区域 -->
      <el-col :span="16"
        ><div class="grid-content ep-bg-purple" />

        <div class="user-info">
          <div style="height: 20px"></div>
          <!-- <img src="../../assets/baseavatar.jpg" alt="" class="img" /> -->
          <el-image :src="positionInfo.avatar" class="img"></el-image>
          <div class="username">
            <p>{{ positionInfo.hrName }}</p>
            <p>{{positionInfo.nickName}}</p>
          </div>
        </div>

        <div class="job-info">
          <div style="height: 20px"></div>
          <h3>招聘需求</h3>
          <div class="detail">
            <p>
                {{positionInfo.requirement}}
            </p>
          </div>
          <div style="height: 10px"></div>
        </div>

        <div class="job-info">
          <div style="height: 20px"></div>
          <h3>公司使命</h3>
          <div class="detail">
            <p>
              {{positionInfo.mission}}
            </p>
          </div>
          <div style="height: 10px"></div>
        </div>
      </el-col>
      <!-- 右侧区域 -->
      <el-col :span="8"
        ><div class="grid-content ep-bg-purple" />

        <div class="d-company">
          <div class="company-info">
            <div style="height: 20px"></div>
            <h3>公司信息</h3>
            <div class="name">
              <span @click="companyDetails(positionInfo.companyId)">{{positionInfo.companyName}}</span>
              <span style="float: right; color: #ff6400" v-if="isFollow" @click="addFollow">关注</span>
              <span style="float: right; color: #ff6400" v-else @click="cancelFollow">已关注</span>
            </div>
            <p>在招职位：<span>{{companyCount}}</span></p>
            <p>外文名称：<span>{{positionInfo.foreignName}}</span></p>
            <p>公司地址：<span>{{positionInfo.companyCity}}</span></p>
            <div class="logo">
              <!-- <img src="../../assets/nofound.png" alt="" /> -->
              <el-image :src="positionInfo.logo" class="logo-img"></el-image>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import api from '@/api/base'
import favor from '@/api/favor'
import follow from '@/api/follow'
import { ElMessage } from 'element-plus';
import bus from 'vue3-eventbus'

export default{

  setup(){
    // 保存职位信息
    const positionInfo = {}

    // 保存登录用户信息
    const userInfo = {}

    // 公司正在招聘职位的数量
    const companyCount = ref(0)

    const state = reactive({
      positionInfo,
      userInfo,
      isFavor:true,
      isFollow:true,
      isApply:false,
      needFixed: false,
    });

    const Route = useRoute();
    const Router = useRouter()
    // 监听滚动距离
    const handleScroll = () => {
        bus.on('topValue', (top)=>{
          if (top> 200) {
          state.needFixed = true
        } else {
          state.needFixed = false
        }
        })
    }

    // 根据id获取职位信息
    const getPositionInfo = () => {
      const id = Route.params.id;
      console.log(id);
      api.getPositionById(id).then((result) => {
        state.positionInfo = result.data
        getPositionCountByCompany(result.data.companyId)
        getFavor()
        getFollow()
        getApply()
      }).catch((err) => {
        
      });
    } 
    // 点击跳转公司页面
    const companyDetails = (item) => {

      const goCompany = Router.resolve({
        name: 'company',
        params: { id: item }
      })
      window.open(goCompany.href, '_blank')
      ElMessage.success("公司页面")
    }

    // 收藏职位
    const addFavor = () =>{

      if(!state.userInfo){
        ElMessage.warning("请登录后操作")
        return
      }

      const requestData = {
        userId:state.userInfo.id,
        positionId:state.positionInfo.id
      }
      favor.addFavor(requestData).then((result) => {
        ElMessage.success(result.msg)
        state.isFavor = false
      }).catch((err) => {
        
      });
    }
    // 关注公司
    const addFollow = () =>{
      if(!state.userInfo){
        ElMessage.warning("请登录后操作")
        return
      }

      const requestData = {
        userId:state.userInfo.id,
        companyId:state.positionInfo.companyId
      }
      follow.addFollow(requestData).then((result) => {
        ElMessage.success(result.msg)
        state.isFollow = false
      }).catch((err) => {
        
      });
    }
    // 取消收藏职位
    const cancelFavor = () =>{
      
      favor.cancelFavor(state.userInfo.id ,state.positionInfo.id).then((result) => {
        ElMessage.success(result.msg)
        state.isFavor = true
      }).catch((err) => {
        
      });
    }
    // 取消关注公司
    const cancelFollow=()=>{
      follow.cancelFollow(state.userInfo.id ,state.positionInfo.companyId).then((result) => {
        ElMessage.success(result.msg)
        state.isFollow = true
      }).catch((err) => {
        
      });
    }
    // 查看职位是否收藏
    const getFavor=()=>{
      favor.getFavor(state.userInfo.id ,state.positionInfo.id).then((result) => {
        if(result.data == 1){
          state.isFavor = false
        }
      }).catch((err) => {
        
      });

    }
     // 查看公司是否被关注
     const getFollow=()=>{

      follow.getFollow(state.userInfo.id ,state.positionInfo.companyId).then((result) => {
        if(result.data == 1){
          state.isFollow = false
        }
      }).catch((err) => {
        
      });

    }

    // 查看职位是否被投递
    const getApply = () =>{

      const requestData = {
        userId:state.userInfo.id,
        positionId:state.positionInfo.id
      }
      api.isApply(requestData).then((result) => {
        if(result.data == 1){
          state.isApply = true
        }
      }).catch((err) => {
        
      });
    }

    // 根据公司id查询职位数量
    const getPositionCountByCompany=(id)=>{
        api.getPositionCountByCompany(id).then((result) => {
            companyCount.value= result.data
        }).catch((err) => {
            
        });
    }

    // 投递简历
    const addApply = () =>{
      if(!state.userInfo){
        ElMessage.warning("请登录后操作")
        return
      }
      const requestData = {
        positionId:state.positionInfo.id,
        companyId:state.positionInfo.companyId,
        userId:state.userInfo.id,
        hrId:state.positionInfo.hrId,
      }
      api.addApply(requestData).then((result) => {
        state.isApply = true
        ElMessage.success(result.msg)
        
      }).catch((err) => {
        
      });
    }

    // 获取用户信息
    const getUserInfo = ()=>{
       state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    }

    onMounted(() => {
      getUserInfo(),
      getPositionInfo()
      handleScroll()
    })

    return {
      Route,
      Router,
      ...toRefs(state),
      addApply,
      getFavor,
      addFavor,
      cancelFavor,
      getFollow,
      addFollow,
      cancelFollow,
      companyDetails,
      companyCount,
      getUserInfo,
      getPositionInfo,
      getPositionCountByCompany,
    }

  }

}
   


  

</script>

<style lang="less" scoped>

.hasFixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.d-nav {
  width: 100%;
  background-color: #fff;
  height: 100px;
  text-align: left;
  .nav-info {
    width: 605;
    float: left;
    margin-left: 20px;
    h2 span {
      color: #ff6400;
      font-size: 16px;
      margin-left: 30px;
    }
    .tag {
      margin: 20px auto;
      span {
        margin-right: 30px;
      }
    }
  }
  .nav-button {
    width: 40%;
    float: right;
    button {
      float: right;
      width: 150px;
      height: 45px;
      line-height:45px;
      border-radius: 50px;
      color: #fff;
      border: none;
      outline: none;
      margin-left: 40px;
      cursor: pointer;
    }
    .but-left {
      background-color: gray;
    }
    .but-right {
      background-color: #ff6400;
    }
  }
}

.job-info {
  width: 100%;
  height: auto;
  margin-top: 20px;
  background-color: #fff;
  text-align: left;
  border-radius: 10px;
  h3 {
    margin-left: 20px;
  }
  .detail {
    width: 90%;
    margin: 20px 20px;
    font-size: 14px;
  }
}

.d-company {
  width: 100%;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  text-align: left;
  .company-info {
    width: 80%;
    margin-left: 20px;
    .name {
      margin-top: 20px;
      margin-bottom: 20px;
      span {
        cursor: pointer;
      }
    }
    p {
      margin-top: 10px;
      font-size: 13px;
    }
    .logo {
      margin-top: 20px;
      width: 300px;
      height: 180px;
      .logo-img {
        height: 100%;
        width: 100%;
        border-radius: 10px;
      }
    }
  }
}
.d-content {
  margin: 20px auto;
  width: 70%;
  height: auto;
}
.user-info {
  background-color: #fff;
  height: 100px;
  border-radius: 10px;
  .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    float: left;
    margin-left: 20px;
  }
  .username {
    float: left;
    margin-left: 20px;
    text-align: left;
    p {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>>

