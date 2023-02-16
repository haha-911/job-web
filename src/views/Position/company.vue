<template>
  <div class="d-nav" :class="{ hasFixed: needFixed }">
    <div style="height: 20px"></div>

    <div style="width: 70%; margin: auto">
      <div class="nav-info">
        <h2>{{companyInfo.name}}</h2>
        <div class="tag">
          <span @click="isRecruit = false" :class="{ hoverColor: !isRecruit }">简介</span>
          <span @click="isRecruit = true" :class="{ hoverColor: isRecruit }">热招职位({{ total }})</span>
        </div>
      </div>

      <div class="nav-button">
        <button class="but-right" v-if="isFollow" @click="addFollow">关注公司</button>
        <button class="but-right" v-else @click="cancelFollow">已关注</button>
      </div>
    </div>
  </div>

  <!-- 公司简介 -->
  <div :class="{ hasTop: isRecruit }">
    <div class="company-profile">
      <div class="left-text">
        <div style="height: 20px"></div>
        <span>公司使命</span>
        <p>{{companyInfo.mission}}</p>
        <span>公司简介</span>
        <p>
          {{companyInfo.description}}
        </p>
      </div>

      <div class="right-img">
        <!-- <img src="../../assets/nofound.png" alt="" /> -->
        <el-image :src="companyInfo.logo"></el-image>
      </div>
    </div>

    <div class="title">
      <h3>热招职位</h3>
      <span @click="isRecruit = true">查看更多<el-icon>
          <ArrowRight />
        </el-icon></span>
    </div>

    <div class="hot-company">
      <ul>
        <li v-for="(item,index) in positionList" :key="index" @click="positionDetails(item)">
          <div style="height:20px"></div>
          <div style="height:25px">
            <h3>{{item.title}}</h3>
            <span>{{item.salaryDown}} - {{item.salaryUp}}</span>
          </div>
          <div class="local-count">
            {{item.city}} &nbsp;&nbsp;&nbsp;{{ item.quantity - 1 }}~{{ item.quantity + 3 }}人
          </div>
        </li>
      </ul>
      <!-- 无适合职位 -->
      <div style="margin-left: 250px" v-if="positionList.length == 0">
        <img src="../../assets/nofound.png" alt="" style="width: 274px; height: 200px" />
        <p>非常抱歉！该公司暂无招聘职位</p>
      </div>
    </div>
  </div>

  <!-- 热招职位 -->
  <div class="company-position" :class="{ hasTop: !isRecruit }">
    <el-row :gutter="20">
      <!-- 左侧区域 -->
      <el-col :span="16">
        <div class="grid-content ep-bg-purple" />

        <div class="position-list" v-for="(item,index) in positionList" :key="index" >
          <div class="position-left">
            <div @click="positionDetails(item)">
              <h3>{{item.title}}&nbsp;【{{ item.city }}】<b>{{item.salaryDown}} - {{item.salaryUp}}</b></h3>
              <p>{{item.requirement}}</p>
            </div>

          </div>
          <div class="position-right">
            <el-image :src="item.avatar" alt class="position-avator"/> <br>
            <span style="margin-top:15px">{{ item.nickName }}</span>

          </div>
        </div>

        <!-- 无适合职位 -->
        <div class="nofound" v-if="positionList.length == 0">
          <div style="height: 100px"></div>
          <img src="../../assets/nofound.png" alt="" style="width: 274px; height: 200px" />
          <p>非常抱歉！该公司暂无招聘职位</p>
        </div>

        <!-- 分页 -->
        <div style="margin-bottom: 20px" v-if="positionList.length !== 0">
          <el-pagination background :page-size="requestParam.pageSize" :pager-count="5" layout="prev, pager, next"
            :total="total" @current-change="handleCurrentChange" />
        </div>
      </el-col>
      <!-- 右侧区域 -->
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />
        <div class="d-company">
          <div class="company-info">
            <div style="height: 20px"></div>
            <h3>推荐公司</h3>
            <div class="name">
              <span>该模块未开发！！！！</span>
              <span style="float: right; color: #ff6400">关注</span>
            </div>
            <!-- <p>在招职位：<span>{{ total }}</span></p>
            <p>外文名称：<span>26</span></p>
            <p>公司地址：<span>26</span></p> -->
            <div class="logo">
              <!-- <img src="../../assets/nofound.png" alt="" /> -->
              <el-image :src="companyInfo.logo"></el-image>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import api from '@/api/base'
import follow from "@/api/follow"
import { ElMessage } from "element-plus";
import bus from 'vue3-eventbus'
export default {
  setup() {
    const requestParam = {
      page: 1,
      pageSize: 6,
      companyId: "",
    }

    const state = reactive({
      positionList: [],
      companyInfo:{},
      userInfo:{},
      isFollow: true,
      total:0,
      needFixed: false,
      isRecruit: false,
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
     // 点击跳转职位详情
     const positionDetails = (item) => {
      const goPosition = Router.resolve({
        name:'job',
        params:{id:item.id}
      })
      window.open(goPosition.href,'_blank')
    }

    // 获取该公司的职位列表
    const getPositionList = () => {
      api.getPositionList(requestParam).then((result) => {
        state.positionList = result.data.records
        state.total = result.data.total
      }).catch((err) => {
        
      });
    }

     // 改变当前页
     const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
      requestParam.page = val
      getPositionList()
    }

    // 获取公司信息
    const getCompanyInfo = () => {
      const id = Route.params.id
      requestParam.companyId = id
      api.getCompanyById(id).then((result) => {
        state.companyInfo = result.data
        getPositionList()
        getFollow()
      }).catch((err) => {
        
      });
    };

     // 关注公司
     const addFollow = () =>{
      if(!state.userInfo){
        ElMessage.warning("请登录后操作")
        return
      }

      const requestData = {
        userId:state.userInfo.id,
        companyId:state.companyInfo.id
      }
      follow.addFollow(requestData).then((result) => {
        ElMessage.success(result.msg)
        state.isFollow = false
      }).catch((err) => {
        
      });
    }

     // 取消关注公司
     const cancelFollow=()=>{
      follow.cancelFollow(state.userInfo.id ,state.companyInfo.id).then((result) => {
        ElMessage.success(result.msg)
        state.isFollow = true
      }).catch((err) => {
        
      });
    }

    // 查看公司是否被关注
    const getFollow=()=>{
      getUserInfo();
      follow.getFollow(state.userInfo.id ,state.companyInfo.id).then((result) => {
        if(result.data == 1){
          state.isFollow = false
        }
      }).catch((err) => {
        
      });

    }

    // 获取登录的用户
    const getUserInfo = ()=>{
     state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }

    onMounted(() => {
      getCompanyInfo();
      handleScroll();
    });

    return {
      Route,
      Router,
      ...toRefs(state),
      getFollow,
      addFollow,
      cancelFollow,
      getCompanyInfo,
      handleCurrentChange,
      getPositionList,
      positionDetails,
      requestParam,
    };
  },
};
</script>

<style lang="less" scoped>
.nofound {
  width: 100%;
  height: 500px;
  margin: auto;
}

.hasTop {
  display: none;
}

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

    h2 span {
      color: #ff6400;
      font-size: 16px;
    }

    .tag {
      font-size: 15px;
      margin: 20px auto;

      span {
        margin-right: 30px;
        cursor: pointer;
      }

      .hoverColor {
        color: #ff6400;
        font-weight: 800;
        font-size: 16px;
        border-bottom: 2px solid #ff6400;
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
      border-radius: 50px;
      color: #fff;
      border: none;
      outline: none;
      background-color: #ff6400;
      cursor: pointer;
    }
  }
}

.company-profile {
  margin: 20px auto;
  width: 70%;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  text-align: left;

  .left-text {
    float: left;
    margin-left: 20px;
    width: 60%;

    span {
      font-weight: bolder;
    }

    p {
      height: auto;
      font-size: 15px;
      margin-top: 10px;
      margin-bottom: 20px;
      line-height: 22px;
      letter-spacing: 1px;
    }
  }

  .right-img {
    float: right;
    width: 34%;
    margin: 20px 20px 10px 0px;

    img {
      width: 360px;
      height: 240px;
      border-radius: 10px;
    }
  }
}

.title {
  width: 70%;
  height: 30px;
  margin: auto;
  text-align: left;
  margin-top: 50px;

  h3 {
    float: left;
  }

  span {
    font-size: 13px;
    color: #ff6400;
    float: right;
    margin-right: 34px;
    cursor: pointer;
  }
}

.hot-company {
  width: 70%;
  height: 250px;
  margin: 10px auto;
  text-align: left;
  cursor: pointer;

  li {
    width: 310px;
    height: 100px;
    float: left;
    margin-right: 32px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 10px;

    h3 {
      float: left;
      height: 22px;
      margin-left: 20px;
    }

    span {
      font-size: 15px;
      color: #ff6400;
      float: right;
      
      margin-right: 10px;
    }

    .local-count {
      float: left;
      margin-left: 20px;
      margin-top: 15px;
      font-size: 13px;
    }
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

      img {
        height: 100%;
        width: 100%;
        border-radius: 10px;
      }
    }
  }
}

.position-list {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  background-color: #fff;
  text-align: left;
  margin-bottom: 20px;

  .position-left {
    float: left;
    width: 80%;
    margin-left: 15px;
    margin-top: 15px;
    cursor: pointer;

    b {
      color: #ff6400;
    }

    p {
      font-size: 12px;
      margin-top: 10px;
    }
  }

  .position-right {
    float: left;
    width: 15%;
    margin: 8px auto;
    text-align: center;

    .position-avator {
      width: 40px;
      height: 40px;
      margin: auto;
      border-radius: 50%;
    }
  }
}

.company-position {
  margin: 20px auto;
  width: 70%;
  height: auto;
}
</style>>

