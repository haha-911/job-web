<template>

  <!-- 收藏列表 -->
  <div>
    <ul>
      <li class="position-list" v-for="(item, index) in favorList" v-bind:key="index">
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

        <div class="del-but"   @click="delFavor(item)">
          <el-button type="danger" round >取消收藏</el-button>
        </div>
        <div class="position-right">
          <el-button type="success" round >收藏时间</el-button>
          <br>
          <span style="margin-top:15px">{{ item.create_time }}</span>
        </div>

        
      </li>

    </ul>
  </div>
  <!-- 无适合职位 -->
  <div style=" width: 100%;height: 500px;margin: auto;" v-if="favorList.length ==0">
    <div style="height:100px"></div>
    <img src="../../assets/nofound.png" alt="" style="width:274px;height:200px">
    <p>还没有收藏职位！快去寻找喜欢的职位吧！</p>
  </div>

  <!-- 分页 -->
  <div style="margin-bottom:20px" v-if="favorList.length !==0">
    <el-pagination background :page-size="requestParam.pageSize" :pager-count="5" layout="prev, pager, next"
      :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import api from '@/api/favor'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { bus } from 'vue3-eventbus'

export default {

  setup() {

    let requestParam = {
      page:1,
      pageSize:5
    }
    const total  = ref(-1)

    const favorList = ref([])
    const router = useRouter()

    const userInfo = ref({})


    // 获取收藏列表
    const getFavorData = () => {
      api.getUserFavor(userInfo.value.id,requestParam).then((result) => {
        favorList.value = result.data.records
        total.value = result.data.total
        bus.emit("favorTotal",total.value)
      }).catch((err) => {

      });

    }

    // 取消收藏
    const delFavor = (item) =>{
      api.delFavor(item.id).then((result) => {
        ElMessage.success(result.msg)
        getFavorData()
      }).catch((err) => {
        
      });
    }

    // 获取用户信息
    const getUserInfo = () => {
      userInfo.value = JSON.parse(sessionStorage.getItem("userInfo"))
    }
    const handleCurrentChange=(val)=>{
      requestParam.page = val

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

    onMounted(() => {
      getUserInfo()
      getFavorData()
    })

    return {
      total,
      handleCurrentChange,
      router,
      delFavor,
      requestParam,
      companyDetails,
      positionDetails,
      favorList,
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
  margin-top:20px;
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
  margin-top: 30px;
}

</style>