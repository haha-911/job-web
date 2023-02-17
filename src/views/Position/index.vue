<template>
  <div style="width:75%;height:auto;margin:auto">
  <!-- 搜索区域 -->
  <div class="search-area" :class="{ 'hasFixed': needFixed == true }">
    <div style="height:20px"></div>
     <!-- 搜索框 -->
     <div class="search">
      <div class="search-inner">
        <input class="search-input" v-model="key" placeholder="搜索职位/公司/内容关键词" />
        <button color="#ff6400" class="search-button" @click="searchPosition">搜索</button>
      </div>
    </div>
  </div>

  <div style="margin:10px auto"></div>

  <!-- 条件区域 -->
  <div class="search-select">
    <!-- 城市 -->
    <div class="condition">
      <ul>
        <span class="title">城市</span>
        <li :class="cityIndex == index ? 'select-color' : ''" @click="cityColor(item, index)"
          v-for="(item, index) in cityList" :key="index">{{ item }}</li>
      </ul>
    </div>

     <!-- 薪资 -->
    <div class="condition">
      <ul>
        <span class="title">薪资</span>
        <li :class="salaryIndex == index ? 'select-color' : ''" @click="salaryColor(item, index)"
          v-for="(item, index) in salaryList" :key="index">{{ item }}</li>
      </ul>
    </div>

    
 <!-- 发布日期 -->
    <div class="condition">
      <ul>
        <span class="title">发布时间</span>
        <li :class="timeIndex == index ? 'select-color' : ''" @click="timeColor(item, index)"
          v-for="(item, index) in timeList" :key="index">{{ item }}</li>
      </ul>
    </div>

    <!-- 更多 -->
    <div class="condition">
      <ul>
        <span class="title">更多</span>
        <li>
          <el-select v-model="education" @change="selectEducation" class="m-2" placeholder="请选择学历" style="height:40px;width:150px">
            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label" />
          </el-select>
        </li>

        <li>
          <el-select v-model="category" @change="selectCategory" @focus="getCategoryList" class="m-2" placeholder="职位分类" style="height:40px;width:150px">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </li>
      </ul>
    </div>

  </div>
  <div style="margin:20px auto"></div>

  <!-- 职位列表页面 -->
  <el-row :gutter="20">

    <!-- 页面左侧模块 -->
    <el-col :span="16">
      <div class="grid-content ep-bg-purple" />
      <!-- 职位列表 -->
      <div>
        <ul>
          <li class="position-list" v-for="(item, index) in positionList" v-bind:key="index">
            <div class="position-left">
              <div @click="positionDetails(item)">
                <h3>{{ item.title }}&nbsp;【{{ item.city }}】<b>{{ item.salaryDown }}-{{ item.salaryUp }}</b></h3>
                <p>{{ item.requirement }}</p>
              </div>

              <div class="company-info" @click="companyDetails(item)">

                <div class="small-logo">
                  <el-image :src="item.logo" alt="" style="width: 22px;height: 22px;"></el-image>
                </div>


                <span><b>{{ item.companyName }}</b></span>

                <span><el-divider direction="vertical" /></span>
                <span>{{ item.releaseDate }}</span>
                <span>{{ item.quantity - 1 }}~{{ item.quantity + 3 }}人</span>
              </div>
            </div>
            <div class="position-right">
              <el-image :src="item.avatar" alt class="position-avator"></el-image>
              <!-- <img src="../../assets/baseavatar.jpg" alt class="position-avator" />-->
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

      <div class="content-right">
<h2>广告区域（未开发）</h2>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import api from '@/api/base'
import { onMounted, reactive, ref, toRefs, onBeforeUnmount } from '@vue/runtime-core'
import { dayjs,ElMessage } from 'element-plus'
import { bus } from 'vue3-eventbus'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {

  },

  setup() {

    // 获取路由，接受参数
    const route = useRoute()

    const router = useRouter()

    // 请求参数
    let requestParam = {
      page: 1,
      pageSize: 7,
      name: '',
      city:'',
      releaseDate:'',
      minSalary:'',
      maxSalary:'',
      diploma:'',
      categoryId:'',
    }

    const key = ref("")
    // 引用数据
    const state = reactive({
      positionList: [],
      categoryList: [],
      cityList: ['全国', '北京', '上海', '天津', '重庆', '广州', '深圳', '苏州', '南京', '杭州', '大连', '成都', '武汉', '西安'],
      salaryList: ['不限','3K以下', '3K-5k', '5K-10k', '10K-20k', '20K-40k', '40K-60k', '60K以上'],
      timeList: ['不限', '一天以内', '三天以内', '一周以内', '一月以内'],
      cityIndex: 0,
      salaryIndex: 0,
      timeIndex: 0,
      total: 0,
      education:'',
      category:'',
      needFixed: false,
    })

     // 监听滚动距离
     const handleScroll = () => {
        bus.on('topValue', (top)=>{
          if (top > 160) {
          state.needFixed = true
        } else {
          state.needFixed = false
        }
        })

        bus.on('key',(msg)=>{
        key.value = msg
        console.log(key.value)
      })
    }

    // 选择城市
    const cityColor = (item, index) => {
      state.cityIndex = index
      if(index==0){
        requestParam.city = ''
      }else{
        requestParam.city = item
      }    
      getPositionList() 
      console.log(requestParam);

    }

    // 选择学历
    const selectEducation=(val)=>{
      requestParam.diploma = val
      console.log(requestParam);
    }
    // 选择分类
    const selectCategory=(val)=>{
      requestParam.categoryId = val
      getPositionList()
      console.log(requestParam);
    }

    // 选择薪资
    const salaryColor = (item, index) => {
      state.salaryIndex = index

      if(index == 0){
        requestParam.maxSalary = ''
        requestParam.minSalary = ''
      }else if(index == 1){
        requestParam.maxSalary = 3000
        requestParam.minSalary = ''
      }else if(index == 2){
        requestParam.maxSalary = 5000
        requestParam.minSalary = 3000
      }else if(index == 3){
        requestParam.maxSalary = 10000
        requestParam.minSalary = 5000
      }else if(index == 4){
        requestParam.maxSalary = 20000
        requestParam.minSalary = 10000
      }else if(index == 5){
        requestParam.maxSalary = 40000
        requestParam.minSalary = 20000
      }else if(index == 6){
        requestParam.maxSalary = 60000
        requestParam.minSalary = 40000
      }else{
        requestParam.minSalary = 60000
        requestParam.maxSalary = ''
      }
      getPositionList() 
    console.log(requestParam);
    }

    // 选择发布时间
    const timeColor = (item, index) => {
      state.timeIndex = index

      if(index == 0){
        requestParam.releaseDate = ''
      }else if(index == 1){
        requestParam.releaseDate =  dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss');
      }else if(index == 2){
        requestParam.releaseDate =  dayjs(new Date()).subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss');
      }else if(index == 3){
        requestParam.releaseDate =  dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss');
      }else{
        requestParam.releaseDate =  dayjs(new Date()).subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss');
        
      }
      getPositionList() 
      console.log(requestParam);

    }

    // 学历列表
    const options = [
      {
        value: '1',
        label: '高中',
      },
      {
        value: '2',
        label: '专科',
      },
      {
        value: '3',
        label: '本科',
      },
      {
        value: '4',
        label: '研究生',
      },
    ]  
    // 点击跳转职位详情
    const positionDetails = (item) => {
      const goPosition = router.resolve({
        name:'job',
        params:{id:item.id}
      })
      window.open(goPosition.href,'_blank')
    }
    // 点击跳转公司页面
    const companyDetails = (item) => {
      const goCompany = router.resolve({
        name: 'company',
        params: { id: item.companyId }
      })
      window.open(goCompany.href, '_blank')
      ElMessage.success("公司页面")
    }
    //  搜索按钮
    const searchPosition = () => {
      requestParam.name = key.value
      getPositionList() 
    }
    // 改变当前页
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
      requestParam.page = val
      getPositionList()
    }
    // 获取职位列表
    const getPositionList = () => {
        requestParam.name = key.value
      api.getPositionList(requestParam).then((result) => {
        state.positionList = result.data.records
        state.total = result.data.data.total
      }).catch((err) => {

      });
      
      console.log(requestParam);
    }
    // 获取职位分类列表
    const getCategoryList = () =>{
      api.getCategoryList().then((result) => {
        state.categoryList = result.data
        console.log(state.categoryList);
      }).catch((err) => {
        
      });
    }

    onBeforeUnmount(() => {
      
    })

    onMounted(() => {
      handleScroll()
      getPositionList()
      
    })

    return {
      ...toRefs(state),
      route,
      router,
      key,
      options,
      requestParam,
      handleScroll,
      getPositionList,
      getCategoryList,
      selectCategory,
      selectEducation,
      handleCurrentChange,
      positionDetails,
      companyDetails,
      searchPosition,
      cityColor,
      salaryColor,
      timeColor,
    }

  }
}
</script>

<style lang="less" scoped>

.content-right{
  width: 100%;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  h2{
    margin: auto;
    line-height: 100px;
  }
}
.nofound{
  width: 100%;
  height: 500px;
  margin: auto;
}
.search-select {
  width: 100%;
  height: 230px;
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;


  .select-color {
    color: #ff6400;
    font-weight: 700;

  }

  .condition {
    width: 95%;
    height: 50px;
    margin: auto;
    margin-left: 15px;
    line-height: 60px;
    border-bottom: 1px solid gray;
    float: left;

    .title {
      font-weight: 700;
      float: left;
      width: 80px;
      height: 50px;
    }

    li {
      float: left;
      font-size: 14px;
      margin-right: 25px;
    }

    li:hover {
      color: #ff6400;
      cursor: pointer;
    }

  }

}


.hasFixed {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .search{
    margin-left: 190px;
  
  }
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
.search-area{
  width: 100%;
  height: 100px;
}
.search {
  height: 60px;
  width: 750px;
  .search-inner {
    height: 53px;
    border-radius: 40px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 5px #aaa;

  }

  .search-inner:hover {
    border: 2px solid #ff6400;
  }

  .search-input {
    width: 600px;
    height: 38px;
    margin-top: 6px;
    margin-left: 12px;
    outline: none;
    border: none;
    float: left;

  }

  .search-button {
    float: right;
    color: #fff;
    font-size: 16px;
    margin-right: 10px;
    margin-top: 6px;
    border-radius: 40px;
    width: 75px;
    height: 40px;
    border: none;
    background-color: #ff6400;

  }

}
</style>