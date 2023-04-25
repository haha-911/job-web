<template>

  <div style="width:75%;height:auto;margin:auto">

  <div style="margin:30px auto"></div>

  <el-row :gutter="20">

    <!-- 页面左侧模块 -->
    <el-col :span="16">
      <div class="grid-content ep-bg-purple" />

      <!-- 求职期望 -->
      <div class="expect" :class="{ 'hasFixed': needFixed == true }">

        <div style="height:15px"></div>

        <div class="expect-value">
          <span @click="hoverColor(item,idx)" :class="idx==index?'hover-color':''" v-for="(item,idx) in expectList" :key="idx">{{item}}</span>
        </div>
        <div class="right-text" @click="goResume">
          <span ><el-icon :size="20">
            <CirclePlus />
          </el-icon>
        </span>
        <span>编辑求职期望</span>
        </div><br>

        <div class="expect-button">
        <button @click="getButtonValue(true,0)" :class="{'font-color':isHiddenButtonValue}">推荐</button>
          <button @click="getButtonValue(false,1)" :class="{'font-color':!isHiddenButtonValue}">最新</button>
        </div>
      </div>

      <div style="height:20px"></div>

      <!-- 职位列表 -->
      <div>
        <ul>
          <li class="position-list" v-for="(item, index) in positionList" v-bind:key="index">
            <div class="position-left">
              <div @click="positionDetails(item)">
                <h3>{{ item.title }}&nbsp;【{{ item.city }}】<b>{{ item.salaryDown }}-{{ item.salaryUp }}</b></h3>
                <p>{{ item.requirement }}</p>
              </div>
              <div class="company-info" @click="companyDetails(item.companyId)">
                <div class="small-logo">
                  <!-- <img src="../../assets/baseavatar.jpg" alt="" style="width: 22px;height: 22px;"> -->
                  <el-image style="width: 22px;height: 22px;" :src="item.logo" />
                </div>
                <span><b>{{ item.companyName }}</b></span>
                <span><el-divider direction="vertical" /></span>
                <span>{{ item.releaseDate }}</span>
                <span>{{ item.quantity - 1 }}~{{ item.quantity + 3 }}人</span>
              </div>
            </div>
            <div class="position-right">
              <el-image :src="item.avatar" alt class="position-avator"/>
              <!-- <img src="../../assets/baseavatar.jpg" alt class="position-avator" /> -->
              <br>
              <span style="margin-top:15px">{{ item.nickName }}</span>
            </div>
          </li>

        </ul>
      </div>

      <!-- 无适合职位 -->
      <div class="nofound" v-if="positionList.length ==0">
        <div style="height:100px"></div>
        <img src="../../assets/nofound.png" alt="" style="width:274px;height:200px">
        <p>非常抱歉！暂时没有合适的职位</p>
      </div>

      <!-- 分页 -->
      <div style="margin-bottom:20px" v-if="positionList.length !==0">
        <el-pagination background :page-size="requestParam.pageSize" :pager-count="5" layout="prev, pager, next"
          :total="total" @current-change="handleCurrentChange" />
      </div>

    </el-col>

    <!-- 页面右侧模块 -->
    <el-col :span="8">
      <div class="grid-content ep-bg-purple" /> 
     
      <h2>热门职位</h2>
      <div class="hot_pos">
        <ul>
          <li v-for="(item,index) in hotPosList" v-bind:key="index" @click="positionDetails(item)" >
            <span class="left_span">{{item.title}} 【{{item.city}}】</span>
            <span class="right_span">{{item.salaryDown}}~{{item.salaryUp}}</span>
          </li>
        </ul>
      </div>

      <h2>热门公司</h2>
      <div class="hot_com">
        <ul>
          <li v-for="(item,index) in hotComList" v-bind:key="index" @click="companyDetails(item.id)" >
            <el-image :src="item.logo" class="img"></el-image>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import api from '@/api/base'
import { onMounted, reactive, ref, toRefs, onBeforeUnmount } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
import { bus } from 'vue3-eventbus'
import { useRouter } from 'vue-router'

export default {
  components: {
  },

  setup() {
    // 请求参数
    const requestParam = {
      page: 1,
      pageSize: 11,
      name: '',
      sortCondition: 0
    }

    const key = ref("")

    const userInfo = {}

    const  expectList = ref(['全部'])

    // 获取路由
    const Router = useRouter()

    // 引用数据
    const state = reactive({
      userInfo,
      hotPosList: [],
      hotComList:[],
      positionList: [],
      index: 0,
      total: 0,
      needFixed: false,
      isHiddenButtonValue:true
    })

    // 获取最新列表或推荐列表
    const getButtonValue=(value,index)=>{

      if(value != state.isHiddenButtonValue){
        state.isHiddenButtonValue = value
      }

      if(index == 0){
        requestParam.sortCondition = index
      }else{
        requestParam.sortCondition = index
      }
      getPositionList()
    }

    // 获取热门职位
    const getHotPosition = ()=>{
      api.getHotPosition().then((result) => {
        state.hotPosList = result.data    
      }).catch((err) => {});

    }

    // 获取热门公司
    const getHotCompany = ()=>{
      api.getHotCompany().then((result) => {
        state.hotComList = result.data    
      }).catch((err) => {});

    }

    // 跳转我的简历页面，添加求职期望
    const goResume=()=>{
      Router.push("/resume")
    }

    // 根据求职期望获取职位
    const hoverColor=(item,idx)=>{
        state.index = idx
        state.isHiddenButtonValue = true
        requestParam.sortCondition = 0
        if(idx == 0){
        requestParam.name = ''
        }else{
          requestParam.name = item
        }
        getPositionList()
    }

    // 监听滚动距离
    const handleScroll = () => {
        bus.on('topValue', (top)=>{
          if (top> 100) {
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
    // 点击跳转公司页面
    const companyDetails = (item) => {

      const goCompany = Router.resolve({
        name:'company',
        params:{id:item}
      })
      window.open(goCompany.href,'_blank')
    }
    
    // 改变当前页
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
      requestParam.page = val
      getPositionList()
    }

    // 获取职位列表
    const getPositionList = () => {
      api.getPositionList(requestParam).then((result) => {
        state.positionList = result.data.records
        state.total = result.data.total
        getUserExpect()
      }).catch((err) => {

      });
    }

    // 获取登录用户信息
    const getUserInfo = () =>{
      state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    }

    // 获取用户求职期望
    const getUserExpect = () =>{
      getUserInfo()
      if(state.userInfo != null){
         api.getExpectByUserId(state.userInfo.id).then((result) => {
        expectList.value[1] = result.msg
        console.log(expectList);
      }).catch((err) => {
        
      });
      }
     
    }

    onMounted(() => {
      getPositionList()
      getHotPosition()
      getHotCompany()
      handleScroll()
    })

    return {
      ...toRefs(state),
      expectList,
      getButtonValue,
      goResume,
      Router,
      key,
      hoverColor,
      requestParam,
      handleCurrentChange,
      positionDetails,
      companyDetails,
    }

  }
}
</script>

<style lang="less" scoped>

.nofound{
  width: 100%;
  height: 500px;
  margin: auto;
}

.font-color{
  color: #ff6400;
}
.expect{
  width:100%;
  height: 100px;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
  
  .expect-value{
    float: left;
    margin-left: 20px;
    height: 26.7px;
    span{
      margin-right: 25px;
      font-weight: 800;
      font-size: 21px; 
      
    }
    span:hover{
      cursor: pointer;
    }
    .hover-color{
      color: #ff6400;
      border-bottom: 3px solid #ff6400;
    } 
  }
  .right-text{
    width: 180px;
    height: 30px;
    color: #ff6400;
    float: right;
   
    span{
      font-size: 15px;
      height: 30px;
      float: left;
      line-height: 25px;
      cursor: pointer;
    }
  }
  .expect-button{
    height: 30px;
    margin-left: 20px;
    margin-top: 30px;
    button{
      margin-right: 10px;
      border-radius: 50px;
      font-size: 15px;
      border: none;
    }
  }
  
}

.hot_pos {
  
  margin-top: 20px;
  li{
  background-color: #fff;
  margin-bottom: 20px;
  height:40px;
  border-radius: 5px;
  line-height: 40px;
  .left_span{
    font-weight: bolder;
    float: left;
    margin-left: 8px;
  }
  .right_span{
    float: right;
    margin-right: 15px;
    color: #ff6400;
  }
  }

}

.hot_com {
  margin-top: 20px;
  li{
    margin-bottom: 20px;
    .img{
      height: 200px;
      width: 100%;
      border-radius: 5px;
    }
  }
 
  
}

.hasFixed {
  margin-left: 184px;
  width: 729px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.position-list {
  background-color: #fff;
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: left;
  .position-left {
    float: left;
    width: 600px;
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
    width: 100px;
    margin: 20px auto;
    text-align: center;
    .position-avator {
      width: 40px;
      height: 40px;
      margin: auto;
      border-radius: 50%;
    }
  }
  
}

.company-info {
  text-align: left;
  height: 30px;
  margin-top: 10px;
  font-size: 13px;

  .small-logo {
    margin-top: 6px;
    width: 30px;
    height: 30px;
    float: left;

    
  }
  b {
    color: #2c3e50;
    font-size: 13px;
    margin-left: 10px;
    align-content: center;
  
  }
  span {
    float: left;
    margin-right: 10px;
    line-height: 30px;
}
}


</style>