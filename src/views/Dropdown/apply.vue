<template>


  <div class="r-tag">
    <span v-for="(item, index) in options" :key="index">
      <button :class="defaultBut == index ? 'hover-but' : ''" @click="getSelect(item, index)">{{ item.value }} <span v-if="defaultBut == index">({{ total }})</span> </button>
    </span>
  </div>
  <!-- 职位列表 -->
  <div>
    <ul>
      <li class="position-list" v-for="(item, index) in applyList" v-bind:key="index"
       @mouseover="displayCancel = true" @mouseleave="displayCancel = false">
        <div class="position-left">
          <div @click="positionDetails(item)">
            <h3>{{ item.title }}&nbsp;【{{ item.city }}】
              <b>{{ item.salary_down }}-{{ item.salary_up }}</b>
              
            </h3>
            <p>{{ item.requirement }}</p>
          </div>

          <div class="company-info" @click="companyDetails(item)">

            <div class="small-logo">

              <el-image style="width: 22px;height: 22px;" :src="item.logo" />
            </div>
            <span><b>{{ item.name }}</b></span>

            <span><el-divider direction="vertical" /></span>
            <span>{{ item.release_date }}</span>
            <span>{{ item.quantity - 1 }}~{{ item.quantity + 3 }}人</span>
          </div>
         
        </div>

        <div class="del-but"  v-if="displayCancel" @click="delApply(item)"><el-icon color="red"><DeleteFilled /></el-icon></div>
        <div class="position-right">
          <el-button type="success" round v-if="item.state == 1" @click="goInterview">面试邀约</el-button>
          <el-button type="warning" round v-if="item.state == 2">已投递</el-button>
          <el-button type="danger" round v-if="item.state == 0">不适合</el-button>
          <br>
          <span style="margin-top:15px">{{ item.apply_time }}</span>
        </div>
      </li>
    </ul>
  </div>

   <!-- 分页 -->
   <div style="margin-bottom:20px" v-if="applyList.length !== 0">
    <el-pagination background :page-size="requestParam.pageSize" :pager-count="5" layout="prev, pager, next"
      :total="total" @current-change="handleCurrentChange" />
  </div>
  <!-- 无适合职位 -->
  <div style=" width: 100%;height: 500px;margin: auto;" v-if="applyList.length ==0">
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
    const applyList = ref([])
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
    { state: '2', value: '投递中' },
    { state: '1', value: '面试邀约' },
    { state: '0', value: '不合适' }]

    const getSelect = (item, index) => {
      defaultBut.value = index
      requestParam.state = item.state
      getApplyData()

    }

    const goInterview = () =>{

      router.push("/interview")
    }

    // 获取投递列表
    const getApplyData = () => {
      api.getApplyList(userInfo.value.id, requestParam).then((result) => {
        applyList.value = result.data.records
        total.value = result.data.total
      }).catch((err) => {
      });

    }

    // 删除投递
    const delApply = (item) =>{
      api.delApply(item.id).then((result) => {
        ElMessage.success(result.msg)
        getApplyData()
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
    const handleCurrentChange = (val) =>{
      requestParam.page = val
      getApplyData()
    }

    onMounted(() => {
      getUserInfo()
      getApplyData()
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
      goInterview,
      companyDetails,
      positionDetails,
      handleCurrentChange,
      applyList,
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
    float: right;
    width: 150px;
    margin-top: 30px;

    span {
      font-size: 10px;
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