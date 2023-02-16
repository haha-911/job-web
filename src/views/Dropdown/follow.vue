<template>

  <!-- 收藏列表 -->
  <div>
    <ul>
      <li class="position-list" v-for="(item, index) in followList" v-bind:key="index">
        <div class="c-info" @click="companyDetails(item)">

          <h2>{{ item.name }}</h2>
          <p>{{ item.mission }}</p>

        </div>
        <div class="c-logo" @click="companyDetails(item)">
          <el-image :src="item.logo" class="img" />
        </div>

        <div class="del-but" @click="delFavor(item)">
          <el-button type="danger" round>取消关注</el-button>
        </div>
        <div class="position-right">
          <el-button type="success" round>关注时间</el-button>
          <br>
          <span style="margin-top:15px">{{ item.create_time }}</span>
        </div>


      </li>

    </ul>
  </div>
  <!-- 无适合职位 -->
  <div style=" width: 100%;height: 500px;margin: auto;" v-if="followList.length == 0">
    <div style="height:100px"></div>
    <img src="../../assets/nofound.png" alt="" style="width:274px;height:200px">
    <p>还没有收藏职位！快去寻找喜欢的职位吧！</p>
  </div>

  <!-- 分页 -->
  <div style="margin-bottom:20px" v-if="followList.length !== 0">
    <el-pagination background :page-size="requestParam.pageSize" :pager-count="5" layout="prev, pager, next"
      :total="total" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import api from '@/api/follow'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { bus } from 'vue3-eventbus'

export default {

  setup() {

    let requestParam = {
      page: 1,
      pageSize: 5
    }
    const total = ref(-1)

    const followList = ref([])
    const router = useRouter()

    const userInfo = ref({})


    // 获取收藏列表
    const getFollowData = () => {
      api.getUserFollow(userInfo.value.id, requestParam).then((result) => {
        followList.value = result.data.records
        total.value = result.data.total

        bus.emit("followTotal",total.value)
      }).catch((err) => {

      });

    }

    // 取消收藏
    const delFavor = (item) => {
      api.delFollow(item.id).then((result) => {
        ElMessage.success(result.msg)
        getFollowData()
      }).catch((err) => {

      });
    }

    // 获取用户信息
    const getUserInfo = () => {
      userInfo.value = JSON.parse(sessionStorage.getItem("userInfo"))
    }
    const handleCurrentChange = (val) => {
      requestParam.page = val

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
      getFollowData()
    })

    return {
      total,
      handleCurrentChange,
      router,
      delFavor,
      requestParam,
      companyDetails,
      followList,
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
  margin-top: 20px;
  border-radius: 10px;
  text-align: left;

  .c-info {
    margin: auto;
    float: left;
    width: 200px;
    margin-left: 15px;
    margin-top: 15px;
    cursor: pointer;

    p {
      font-size: 13px;
      width: 180px;
      margin-top: 10px;
    }
  }

  .c-logo {
    margin-top: 10px;
    float: left;
    width: 180px;
    height: 100px;
    margin-right: 20px;
    cursor: pointer;
    .img{
      border-radius: 10px;
      width: 180px;
      height: 100px;
    }
  }

  .position-right {
    float: right;
    width: 150px;
    margin-top: 40px;

    span {
      font-size: 10px;
    }

  }

}

.del-but {
  float: left;
  margin-top: 40px;
}
</style>