<template>
    <div class="p-header">
      <span>
        <el-button type="primary" @click="handleAdd">发布职位</el-button>
      </span>
      <span>职位状态
        <el-select v-model="requestData.state" class="m-2" placeholder="请选择" @change="handleSelect">
          <el-option label="已下架" value="0" />
          <el-option label="招聘中" value="1" />
          <el-option label="审核中" value="2" />
          <el-option label="已拒绝" value="3" />
        </el-select>
      </span>
    </div>
    <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
  
      <el-table-column type="expand">
        <template #default="props">
          <div class="expand">
            <p><span>发布日期:</span> {{ props.row.releaseDate }}</p>
            <p><span>薪资范围:</span> {{ props.row.salaryDown }} - {{ props.row.salaryUp }} </p>
            <p><span>招聘需求:</span> {{ props.row.requirement }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" />
      <el-table-column label="职位名称" prop="title">
      </el-table-column>
      <el-table-column label="职位城市" prop="city">
      </el-table-column>
      <el-table-column label="招聘人数" prop="quantity">
      </el-table-column>
      <el-table-column label="浏览量" prop="hits">
      </el-table-column>
      <el-table-column label="职位状态">
        <template #default="scope">
          <el-tag v-if="scope.row.state == 3">已拒绝</el-tag>
          <el-tag v-else-if="scope.row.state == 2">审核中</el-tag>
          <el-switch v-else v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"
            @click="changeStatus(scope.row)" :active-value="1" :inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="float:right;margin-top:30px">
      <el-pagination background :page-size="requestData.pageSize" :pager-count="5" layout="prev, pager, next" :total="total"
        @current-change="handleCurrentChange" />
    </div>
  
     <!-- 编辑弹出框 -->
     <el-dialog :title="visibleTitle" v-model="editVisible" width="30%">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="职位名称" prop="title">
              <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="招聘人数" prop="quantity">
              <el-input v-model="form.quantity"></el-input>
          </el-form-item>
          <el-form-item label="工作城市" prop="city">
              <el-input v-model="form.city"></el-input>
          </el-form-item>
          <el-form-item label="薪资范围" prop="salaryUp">
              <el-col :span="11"> <el-input v-model="form.salaryDown" style="width:150px"></el-input></el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="11"><el-input v-model="form.salaryUp" style="width:150px"></el-input></el-col>
          </el-form-item>
          <el-form-item label="职位分类" prop="category">
              <el-select v-model="form.categoryId" placeholder="请选择分类">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="招聘需求" prop="requirement">
              <el-input type="textarea" v-model="form.requirement"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="savePosition">确 定</el-button>
              <el-button type="info" @click="resetForm">重置</el-button>
              <el-button @click="editVisible = false">取 消</el-button>
          </el-form-item>
  
      </el-form>
  
  </el-dialog>
  </template>
  
  <script setup>
  
  import api from '@/api/hr'
  import { reactive, ref } from '@vue/reactivity';
  import { onMounted } from '@vue/runtime-core';
  import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
  
  const requestData = reactive({
    hrId: '',
    state: '1',
    page: 1,
    pageSize: 5
  })
  
  const router = useRouter()
  const total = ref(0)
  const editVisible = ref(false)
  const isAdd = ref(true)
  const visibleTitle = ref("")
  const form = ref({})
  
  const tableData = ref([])
  const categoryList = ref([])
  const multipleSelection = ref([])

  const userInfo = ref({})
  const rules = reactive({
    title:[
        { required: true, message: '请输入标题', trigger: 'blur' },
    ]
  })

  const getUserInfo =()=>{
    userInfo.value = JSON.parse(sessionStorage.getItem('userInfo'))
  }
  
  const getPositionList = () => {
    getUserInfo()

    if(userInfo.value.companyId){
requestData.hrId = userInfo.value.id
    api.getPositionList(requestData).then((result) => {
      tableData.value = result.data.records
      total.value = result.data.total
    })
    }else{
      ElMessage.info('请添加公司后操作！')
      router.push('/hrindex')
    }
    
  }
  

  const getCategory = () =>{
    api.getCategory().then((result) => {
        categoryList.value=result.data
    }).catch((err) => {
        
    });
  }
  const handleCurrentChange = (val) => {
    requestData.pageSize = val
    getPositionList()
  
  }
  
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
    console.log(multipleSelection.value);
  }
  const handleSelect = (val) => {
    requestData.state = val
    getPositionList()
  }
  
  const changeStatus = (val) => {
    let state = 0
    if (val.state == 0) {
      state = 1
    }
  
    api.changePositionState(val.id, state).then((result) => {
      ElMessage.success(result.msg)
      getPositionList()
  
    }).catch((err) => {
  
    });
  }
  const handleEdit = (val) => {
    api.getPositionById(val.id).then((result) => {
      form.value = result.data
      console.log(form);
    })
    getCategory()
    visibleTitle.value = '编辑职位信息'
    editVisible.value =true
    isAdd.value = false
  }
  const handleAdd = (val) => {
    form.value = {}
    getCategory()
    visibleTitle.value = '添加职位'
    editVisible.value =true
    isAdd.value = true
    form.value.companyId = userInfo.value.companyId
    form.value.hrId= userInfo.value.id
  }

  const savePosition =() =>{
    if(!isAdd.value){
        api.updatePosition(form.value).then((result) => {
           ElMessage.success(result.msg)
           getPositionList()
        }).catch((err) => {
            
        });
    }

    if(isAdd.value){
        api.addPosition(form.value).then((result) => {
           ElMessage.success(result.msg)
           getPositionList()
        }).catch((err) => {
            
        });
    }
    editVisible.value = false
  }
  
  const handleDelete = (val) => {
    api.delPosition(val.id).then((result) => {
      ElMessage.success(result.msg)
      getPositionList()
    }).catch((err) => {
  
    });
  }
  
  onMounted(() => {
    getPositionList()
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