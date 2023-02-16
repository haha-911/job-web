<template>

    <div class="r-tag">
      <span v-for="(item, index) in options" :key="index">
        <button :class="defaultBut == index ? 'hover-but' : ''" @click="getSelect(item, index)">{{ item.value }}<span v-if="defaultBut == index">({{ total }})</span></button>
      </span>
    </div>
    <!-- 职位列表 -->
    <div>
      <ul>
        <li class="position-list" v-for="(item, index) in interviewList" v-bind:key="index">
          <div class="position-left">
              <h3>
                <span @click="companyDetails(item)" class="title">{{item.name}}</span>
                <span @click="positionDetails(item)">{{ item.title }}&nbsp;【{{ item.city }}】</span>
            </h3>
              <p>面试地点：{{ item.time }}&nbsp;&nbsp;{{item.address}}</p>
              <p>面试备注：{{item.memo}}</p>
              <p v-if="item.state != 2">面试评价：{{ item.comments}}</p>
          </div>
  
          <!-- <div class="del-but"  v-if="displayCancel" @click="delApply(item)"><el-icon color="red"><DeleteFilled /></el-icon></div> -->
          <div class="position-right">
            <el-button type="success" round v-if="item.state == 1">面试成功</el-button>
            <el-button type="warning" round v-if="item.state == 2">面试中</el-button>
            <el-button type="danger" round v-if="item.state == 0">不适合</el-button>
            <br>
            <span style="margin-top:15px">{{ item.create_time }}</span>
          </div>
        </li>
      </ul>
    </div>
  
     <!-- 分页 -->
     <div style="margin-bottom:20px" v-if="interviewList.length !== 0">
      <el-pagination background :page-size="requestParam.pageSize" :pager-count="5" layout="prev, pager, next"
        :total="total" @current-change="handleCurrentChange" />
    </div>
    <!-- 无适合职位 -->
    <div style=" width: 100%;height: 500px;margin: auto;" v-if="interviewList.length ==0">
      <div style="height:100px"></div>
      <img src="../../assets/nofound.png" alt="" style="width:274px;height:200px">
      <p>非常抱歉！暂时没有合适的职位</p>
    </div>
  </template>
  
  <script>
  import { reactive, toRefs, ref } from '@vue/reactivity'
  import { onMounted } from '@vue/runtime-core'
  import api from '@/api/base'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  
  export default {
  
    setup() {
  
      const defaultBut = ref(0)
      const total = ref(0)
      const interviewList = ref([])
      const router = useRouter()
  
      let requestParam = {
        page:1,
        pageSize:5,
        state:''
      }
  
      const displayCancel = ref(false)
  
      const userInfo = ref({})
  
      const options = [
      {state: '',value: '全部'},
      { state: '2', value: '面试中' },
      { state: '1', value: '面试成功' },
      { state: '0', value: '不合适' }]
  
      const getSelect = (item, index) => {
        defaultBut.value = index
        requestParam.state = item.state
        getInterviewData()
  
      }
  
      // 获取投递列表
      const getInterviewData = () => {
        api.getInterview(userInfo.value.id, requestParam).then((result) => {
          interviewList.value = result.data.records
          total.value = result.data.total
        }).catch((err) => {
        });
      }
  
      // 删除投递
      const delApply = (item) =>{
        api.delApply(item.id).then((result) => {
          ElMessage.success(result.msg)
          getInterviewData()
        }).catch((err) => {
          
        });
      }
  
      // 获取用户信息
      const getUserInfo = () => {
        userInfo.value = JSON.parse(sessionStorage.getItem("userInfo"))
      }
  
      // 点击跳转职位详情
      const positionDetails = (item) => {
        const goPosition = router.resolve({
          name: 'job',
          params: { id: item.positionId }
        })
        window.open(goPosition.href, '_blank')
      }
      // 点击跳转公司页面
      const companyDetails = (item) => {
        const goCompany = router.resolve({
          name: 'company',
          params: { id: item.companyId }
        })
        window.open(goCompany.href, '_blank')
      }
    //   换页
      const handleCurrentChange = (val) =>{
        requestParam.page = val
        getInterviewData()
      }
  
      onMounted(() => {
        getUserInfo()
        getInterviewData()
      })


      return {
        total,
        requestParam,
        defaultBut,
        delApply,
        getSelect,
        options,
        router,
        displayCancel,
        companyDetails,
        positionDetails,
        handleCurrentChange,
        interviewList,
        getUserInfo,
        userInfo,
      }
    }
  
  }
  </script>
  
  <style lang="less" scoped>
  .position-list {
    background-color: #fff;
    width: 100%;
    height: 120px;
    margin-bottom: 20px;
    border-radius: 10px;
    text-align: left;
  
    .position-left {
      float: left;
      width: 420px;
      margin-left: 15px;
      margin-top: 15px;
     span{
        cursor: pointer;
     }
      .title{
        margin-right: 10px;
        color: #ff6400;
      }
      p {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  
    .position-right {
      float: right;
      width: 150px;
      margin-top: 30px;
  
      span {
        font-size: 10px;
      }
  
    }
  
  }
  
  .del-but{
    float: left;
    margin-top: 40px;
    margin-left: 30px;
    cursor: pointer;
  }
  
  .r-tag {
    height: 40px;
    background-color: #fff;
    margin-bottom: 20px;
  
    button {
      float: left;
      margin-top: 10px;
      margin-right: 10px;
      margin-left: 10px;
      font-size: 13px;
      border-radius: 50px;
      height: 20px;
      outline: none;
      border: none;
      cursor: pointer;
    }
  
    .hover-but {
      color: #ff6400;
      background-color: #ffefe5;
      font-size: 15px;
    }
  }
  </style>