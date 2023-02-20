<template>
    <div class="p-header">
      <span>
        <el-button v-if="requestData.state == 2" type="primary" @click="handlePass()">批量通过</el-button>
        <el-button v-if="requestData.state == 2" type="danger" @click="handleRefuse()">批量拒绝</el-button>
      </span>
      <span>申请状态
        <el-select v-model="requestData.state" class="m-2" placeholder="请选择" @change="handleSelect">
          <el-option label="已拒绝" value="0" />
          <el-option label="已通过" value="1" />
          <el-option label="面试中" value="2" />
        </el-select>
      </span>
    </div>
    <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="expand">
            <template #default="props">
              <div class="expand">
                <p><span>面试地址:</span> {{ props.row.address }}</p>
                <p><span>面试备注:</span> {{ props.row.memo }} </p>
                <p><span>面试评价:</span> {{ props.row.comments }}</p>
              </div>
            </template>
          </el-table-column>
      <el-table-column type="selection" width="55" />
      <el-table-column label="职位名称" prop="title" width="130">
      </el-table-column>
      <el-table-column label="面试人" prop="nickname" width="100">
    </el-table-column>
    <el-table-column label="面试者邮箱" prop="email">
    </el-table-column>
    <el-table-column label="面试时间" prop="time" width="140">
    </el-table-column>
      <el-table-column v-if="requestData.state != 2" label="操作时间" prop="updateTime">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" v-if="requestData.state == 2" @click="handlePass(scope.row)">通过</el-button>
          <el-button size="small" type="info" @click="handleResume(scope.row)">简历</el-button>
          <el-button size="small" type="danger" v-if="requestData.state == 2" @click="handleRefuse(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="float:right;margin-top:30px">
      <el-pagination background :page-size="requestData.pageSize" :pager-count="5" layout="prev, pager, next" :total="total"
        @current-change="handleCurrentChange" />
    </div>
  
    <!-- 编辑弹出框 -->
    <el-dialog title="请填写信息" v-model="editVisible" width="30%">
      <el-form ref="formRef" :rules="rules" label-width="80px">
        <el-form-item label="面试评价" prop="memo">
          <el-input type="textarea" v-model="comments"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave('form')">确 定</el-button>
          <el-button type="info" @click="resetForm()">重置</el-button>
          <el-button @click="editVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
  
    </el-dialog>
  
     <!-- 简历弹出框 -->
     <el-dialog :title="resumeTitle" v-model="resumeVisible" width="60%">
      <el-descriptions class="margin-top" title="个人基本信息" :column="3" size="default" border
          label-class-name="my-label">
          <el-descriptions-item label="性别" :contentStyle="{ 'width': '180px' }" v-if="resumeInfo.sex === 0">
              <span>男</span>
          </el-descriptions-item>
          <el-descriptions-item label="性别" :contentStyle="{ 'width': '180px' }" v-else>
              <span>女</span>
          </el-descriptions-item>
          <el-descriptions-item label="年龄">
              <span>{{ resumeInfo.age }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="居住地">
              <span>{{ resumeInfo.home }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="备注">
              <el-tag size="small">
                  {{ resumeInfo.english }}
              </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="求职意向" :span="2">
              <span>{{ resumeInfo.jobIntention }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="3" label="专业技能">
              <span>{{ resumeInfo.ability }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="个人总结">
              <span>{{ resumeInfo.personalSummary }}</span>
          </el-descriptions-item>
      </el-descriptions>
  
      <el-descriptions class="margin-top" title="教育经历" style="margin-top:20px" :column="3" border size="default"
          v-for="(item, index) in education" v-bind:key="index" label-class-name="my-label">
          <el-descriptions-item label="学校名称">
              {{ item.name }}
          </el-descriptions-item>
          <el-descriptions-item label="专业">{{ item.major }}</el-descriptions-item>
          <el-descriptions-item label="学历" v-if="item.diploma === 0">高中</el-descriptions-item>
          <el-descriptions-item label="学历" v-else-if="item.diploma === 1">大学专科</el-descriptions-item>
          <el-descriptions-item label="学历" v-else-if="item.diploma === 2">大学本科</el-descriptions-item>
          <el-descriptions-item label="学历" v-else>大学研究生</el-descriptions-item>
          <el-descriptions-item label="起止时间" :span="3">
              {{ item.startTime }} ~~ {{ item.endTime }}
          </el-descriptions-item>
          <el-descriptions-item label="教育简述" :span="3">
              {{ item.descriptions }}
          </el-descriptions-item>
      </el-descriptions>
  
      <el-descriptions class="margin-top" title="工作经历" style="margin-top:20px" :column="3"
          label-class-name="my-label" border size="default" v-for="(item, index) in experience" v-bind:key="index">
          <el-descriptions-item label="公司名称">
              {{ item.name }}
          </el-descriptions-item>
          <el-descriptions-item label="职位信息" :span="2">
              {{ item.position }}
          </el-descriptions-item>
          <el-descriptions-item label="起止时间" :span="3">
              {{ item.startTime }} ~~ {{ item.endTime }}
          </el-descriptions-item>
          <el-descriptions-item label="主要负责" :span="3">
              {{ item.performance }}
          </el-descriptions-item>
      </el-descriptions>
  
      <el-descriptions class="margin-top" title="项目经历" style="margin-top:20px" :column="1"
          label-class-name="my-label" border size="default" v-for="(item, index) in project" v-bind:key="index">
          <el-descriptions-item label="项目名称">
              {{ item.name }}
          </el-descriptions-item>
          <el-descriptions-item label="项目时间">
              {{ item.startTime }} ~~ {{ item.endTime }}
          </el-descriptions-item>
          <el-descriptions-item label="工作职责">
              {{ item.performance }}
          </el-descriptions-item>
          <el-descriptions-item label="项目背景">
              {{ item.background }}
          </el-descriptions-item>
      </el-descriptions>
  </el-dialog>
  </template>
  
  <script setup>
  
  import api from '@/api/hr'
  import { reactive, ref } from '@vue/reactivity';
  import { onMounted } from '@vue/runtime-core';
  import { ElMessage } from 'element-plus';
  
  const requestData = reactive({
    hrId: '',
    state: '2',
    page: 1,
    pageSize: 5
  })
  const userInfo = ref({})
  const total = ref(0)
  const editVisible = ref(false)
  const isPassInter = ref(true)
  const form = ref([])
  const comments = ref('')
  
  const tableData = ref([])
  const getUserInfo = () => {
    userInfo.value = JSON.parse(sessionStorage.getItem('userInfo'))
  }
  
  const resumeVisible = ref(false)
  const resumeTitle = ref('')
  const resumeInfo = ref({})
  
  const education = ref([])
  const experience =ref([])
  const project = ref([])
  
  const handleResume = (val) =>{
    resumeVisible.value = true
    resumeTitle.value = "用户的简历信息"
    api.getResumeInfo(val.userId).then((result) => {
      resumeInfo.value = result.data
      experience.value = resumeInfo.value.experience
      education.value = resumeInfo.value.education
      project.value = resumeInfo.value.project
    }).catch((err) => {
      
    });
  }
  
  const getInterList = () => {
    getUserInfo()
    requestData.hrId = userInfo.value.id
    api.getInterview(requestData).then((result) => {
      tableData.value = result.data.records
      total.value = result.data.total
    }).catch((err) => {
  
    });
  }
  const handleCurrentChange = (val) => {
    requestData.pageSize = val
    getInterList()
  
  }
  
  const multipleSelection = ref([])
  
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
    console.log(multipleSelection.value);
  }
  const handleSelect = (val) => {
    requestData.state = val
    getInterList()
  }
  
  const rules = reactive({
    address: [
      { required: true, message: '请确认面试地址', trigger: 'blur' },
    ],
    time: [
      { required: true, message: '请确认面试时间', trigger: 'blur' },
    ],
  })
  
  const handlePass = (val) => {
    isPassInter.value = true
    form.value.length  =0
    comments.value = ''
    if (val) {
     form.value.push(val)
    }
    if (!val) {
      if (multipleSelection.value.length == 0) {
        ElMessage.error('请选择数据！')
        return
      }
      form.value= multipleSelection.value
    }
    editVisible.value = true
  }
  
  const handleSave = () => {
    editVisible.value = false
    const data =[]
    form.value.map((item)=>{
        const hh = {}
        hh.id = item.id
        hh.userId= item.userId
        hh.status = requestData.state
        hh.comments = comments.value
        data.push(hh)
    })

    if(isPassInter.value){
        api.passInterview(data).then((result) => {
            ElMessage.success(result.msg);
            getInterList()
        }).catch((err) => {
            
        });

    }else{
        api.refuseInterview(data).then((result) => {
            ElMessage.success(result.msg);
            getInterList()
        }).catch((err) => {
            
        });
    }

    
  }
  
  
  const handleRefuse = (val) => {
    isPassInter.value = false
    form.value.length  =0
    comments.value = ''
    if (val) {
     form.value.push(val)
    }
    if (!val) {
      if (multipleSelection.value.length == 0) {
        ElMessage.error('请选择数据！')
        return
      }
      form.value= multipleSelection.value
    }
    editVisible.value = true
  }
  
  onMounted(() => {
    getInterList()
  })
  </script>
  
  <style lang="less" scoped>
  .p-header {
    margin-bottom: 20px;
  
    span {
      margin-right: 20px;
    }
  }
  
  .expand {
    margin-left: 50px;
  
    span {
      font-weight: 700;
    }
  
    p {
      float: left;
      width: 360px;
      margin-right: 10px;
      margin-bottom: 20px;
    }
  }
  </style>