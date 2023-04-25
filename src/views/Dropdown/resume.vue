<template>
  <div style="margin:30px auto"></div>
  <div style="width:75%;height:auto;margin:auto">

    <el-row :gutter="20">


      <!-- 页面左侧 -->
      <el-col :span="16">
        <div class="grid-content ep-bg-purple" />

        <!-- 用户信息 -->
        <div class="common">
          <div style="height:30px"></div>
          <!-- 基本信息 -->
          <div class="baseInfo">
            <div class="avatar">
              <!-- <img src="../../assets/baseavatar.jpg" alt=""> -->
              <el-tooltip class="box-item" effect="light" content="点击修改头像" placement="left">
                <el-image :src="userInfo.avatar" class="img" @click="updateAvatar"></el-image>
              </el-tooltip>
            </div>
            <div class="avatar-right">
              <div class="username">
                <h2 style="float:left">{{ userInfo.nickname }}</h2>
                <span class="edit-button" @click="updateResumeInfo">编辑</span>
              </div>
              <div class="icon-text">
                <ul>
                  <li v-if="resumeInfo.sex == 0">
                    <el-icon :size="13">
                      <Female />
                    </el-icon><span>男</span>
                  </li>
                  <li v-if="resumeInfo.sex == 1">
                    <el-icon :size="13">
                      <Male />
                    </el-icon><span>女</span>
                  </li>
                  <li>
                    <el-icon :size="13">
                      <MagicStick />
                    </el-icon><span>{{ resumeInfo.age }}</span>
                  </li>
                  <li>
                    <el-icon :size="13">
                      <Location />
                    </el-icon><span>{{ resumeInfo.home }}</span>
                  </li>
                </ul>
              </div>

              <div class="icon-text">
                <ul>
                  <li>
                    <el-icon :size="13">
                      <Iphone />
                    </el-icon><span>{{ userInfo.tel }}</span>
                  </li>
                  <li>
                    <el-icon :size="13">
                      <Message />
                    </el-icon><span>{{ userInfo.email }}</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>


        <!-- 个人总结 -->
        <div>
          <div style="height:15px;background-color:#faf9f9;"></div>
          <!-- 个人总结 -->
          <div class="common">
            <div style="height:20px"></div>
            <div class="nohidden" :class="{ 'hidden': isHiddenSummary }">
              <div class="title">
                <h3 style="float:left">个人总结</h3>
                <span class="edit-button"
                  @click="handleEdit(resumeInfo.personalSummary), isHiddenSummary = true">编辑</span>
              </div>
              <div class="text">
                {{ resumeInfo.personalSummary }}
              </div>
            </div>
            <!-- 修改个人总结 -->
            <div class="yeshidden" :class="{ 'hidden': !isHiddenSummary }">
              <div class="change-title">
                <h3>个人总结</h3>
              </div>

              <div class="change-text">
                <div style="height:20px"></div>
                <div class="change-input">
                  <el-input v-model="form" placeholder="请介绍你自己" type="textarea" white-space: pre-line />
                </div>
                <div class="change-button">
                  <button @click="updateSummary">确定</button>
                  <button class="button-left" @click="isHiddenSummary = false">取消</button>
                </div>

              </div>
            </div>
            <div style="height:20px"></div>
          </div>

        </div>

        <!-- 个人能力 -->
        <div>
          <div style="height:15px;background-color:#faf9f9;"></div>
          <!-- 个人能力 -->
          <div class="common">
            <div style="height:20px"></div>
            <div class="nohidden" :class="{ 'hidden': isHiddenAbility }">
              <div class="title">
                <h3 style="float:left">个人能力</h3>
                <span class="edit-button" @click="handleEdit(resumeInfo.ability), isHiddenAbility = true">编辑</span>
              </div>
              <div class="text">
                {{ resumeInfo.ability }}
              </div>
            </div>
            <!-- 修改个人能力 -->
            <div class="yeshidden" :class="{ 'hidden': !isHiddenAbility }">
              <div class="change-title">
                <h3>个人能力</h3>
              </div>

              <div class="change-text">
                <div style="height:20px"></div>
                <div class="change-input">
                  <el-input v-model="form" placeholder="Please input" type="textarea" />
                </div>
                <div class="change-button">
                  <button @click="updateAbility">确定</button>
                  <button class="button-left" @click="isHiddenAbility = false">取消</button>
                </div>

              </div>
            </div>
            <div style="height:20px"></div>
          </div>

        </div>

        <!-- 求职期望 -->
        <div>
          <div style="height:15px;background-color:#faf9f9;"></div>
          <!-- 求职期望 -->
          <div class="common">
            <div style="height:20px"></div>
            <div class="nohidden" :class="{ 'hidden': isHiddenExpet }">
              <div class="title">
                <h3 style="float:left">求职期望</h3>
                <span class="edit-button" @click="handleEdit(resumeInfo.jobIntention), isHiddenExpet = true">编辑</span>
              </div>
              <div class="text">
                {{ resumeInfo.jobIntention }}
              </div>
            </div>
            <!-- 修改求职期望 -->
            <div class="yeshidden" :class="{ 'hidden': !isHiddenExpet }">
              <div class="change-title">
                <h3>求职期望</h3>
              </div>
              <div class="change-text">
                <div style="height:20px"></div>
                <div class="change-input">
                  <el-input v-model="form" maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
                </div>
                <div class="change-button">
                  <button @click="updateExpect">确定</button>
                  <button class="button-left" @click="isHiddenExpet = false">取消</button>
                </div>

              </div>
            </div>
            <div style="height:20px"></div>
          </div>

        </div>

        <!-- 工作经历 -->
        <div>
          <div style="height:15px;background-color:#faf9f9;"></div>
          <!-- 工作经历 -->
          <div class="common">
            <div style="height:20px"></div>
            <div class="nohidden" :class="{ 'hidden': isHiddenExperience }">
              <div class="title">
                <h3 style="float:left">工作经历</h3>
                <span class="edit-button" @click="addExperience"><el-icon :size="23">
                    <CirclePlus />
                  </el-icon></span>
              </div>
              <div class="text" @mouseover="displayExperience = false" @mouseleave="displayExperience = true"
                v-for="(exper, index) in resumeInfo.experience" :key="index">
                <div>
                  <span><b>{{ exper.name }}</b></span>
                  <span style="margin-left:20px;font-size:12px">{{ exper.startTime }} - {{ exper.endTime }}</span>
                  <span class="edit-button" :class="{ 'hidden': displayExperience }"
                    @click="updateExper(exper)">/编辑</span>
                  <span class="edit-button" :class="{ 'hidden': displayExperience }"
                    @click="delExperience(exper.id)">删除</span>

                </div>
                <div class="logtext">
                  <p style="font-size:13px;">{{ exper.position }}</p>
                  <p style="font-size:14px;margin-bottom:20px">{{ exper.performance }}</p>
                </div>


              </div>
            </div>
            <!-- 修改工作经历 -->
            <div class="yeshidden" :class="{ 'hidden': !isHiddenExperience }">
              <div class="change-title">
                <h3>工作经历</h3>
              </div>

              <div class="change-text">
                <div style="height:20px"></div>
                <!-- 修改信息 -->

                <div style="min-height:400px;height:auto">
                  <div class="info">
                    <ul>
                      <li class="float-left">
                        <p>公司名称</p>
                        <input type="text" v-model="experience.name">
                      </li>

                      <li class="float-right">
                        <p>职位名称</p>
                        <input type="text" v-model="experience.position">
                      </li>
                      <li class="date-input">
                        <p>在职时间</p>
                        <el-date-picker v-model="experience.startTime" type="month" placeholder="开始时间"
                          value-format="YYYY-MM-DD" style="height:35px;width:130px" /> --
                        <el-date-picker v-model="experience.endTime" type="month" placeholder="结束时间"
                          value-format="YYYY-MM-DD" style="height:35px;width:130px" />
                      </li>
                      <br>
                      <li class="text-area">
                        <p>工作职责</p>
                        <el-input v-model="experience.performance" placeholder="Please input" type="textarea"
                          :rows="4" />
                      </li>
                    </ul>
                  </div>

                  <div class="change-button">
                    <button @click="handleExperience">确定</button>
                    <button class="button-left" @click="isHiddenExperience = false">取消</button>
                  </div>
                </div>

              </div>


            </div>
            <div style="height:20px"></div>
          </div>

        </div>

        <!-- 教育经历 -->
        <div>
          <div style="height:15px;background-color:#faf9f9;"></div>
          <!-- 教育经历 -->
          <div class="common">
            <div style="height:20px"></div>
            <div class="nohidden" :class="{ 'hidden': isHiddenEducation }">
              <div class="title">
                <h3 style="float:left">教育经历</h3>
                <span class="edit-button" @click="addEducation"><el-icon :size="23">
                    <CirclePlus />
                  </el-icon></span>
              </div>
              <div class="text" @mouseover="displayEducation = false" @mouseleave="displayEducation = true"
                v-for="(edu, index) in resumeInfo.education" :key="index">
                <div>
                  <span><b>{{ edu.name }}</b></span>
                  <span style="margin-left:20px;font-size:12px">{{ edu.startTime }} - {{ edu.endTime }}</span>
                  <span class="edit-button" :class="{ 'hidden': displayEducation }"
                    @click="updateEducation(edu)">/编辑</span>
                  <span class="edit-button" :class="{ 'hidden': displayEducation }"
                    @click="delEducation(edu.id)">删除</span>

                </div>
                <div class="logtext">
                  <p style="font-size:13px">{{ edu.major }}</p>
                  <p style="font-size:14px;margin-bottom:20px">{{ edu.descriptions }}</p>
                </div>


              </div>
            </div>
            <!-- 修改教育经历 -->
            <div class="yeshidden" :class="{ 'hidden': !isHiddenEducation }">
              <div class="change-title">
                <h3>教育经历</h3>
              </div>

              <div class="change-text">
                <div style="height:20px"></div>
                <!-- 修改信息 -->

                <div style="min-height:400px;height:auto">
                  <div class="info">
                    <ul>
                      <li class="float-left">
                        <p>学校名称</p>
                        <input type="text" v-model="education.name">
                      </li>

                      <li class="float-right">
                        <p>专业名称</p>
                        <input type="text" v-model="education.major">
                      </li>
                      <li class="float-left">
                        <p>学习时间</p>
                        <el-date-picker v-model="education.startTime" type="month" placeholder="开始时间"
                          value-format="YYYY-MM-DD" style="height:35px;width:130px" /> --
                        <el-date-picker v-model="education.endTime" type="month" placeholder="结束时间"
                          value-format="YYYY-MM-DD" style="height:35px;width:130px" />
                      </li>
                      <li class="float-right">
                        <p>学历层次</p>
                        <el-select v-model="education.diploma" class="m-2" placeholder="请选择学历"
                          style="height:40px;width:285px">
                          <el-option v-for="item in options" :key="item.value" :label="item.label"
                            :value="item.value" />
                        </el-select>

                      </li>
                      <li class="text-area">
                        <p>主修课程</p>
                        <el-input v-model="education.descriptions" placeholder="Please input" type="textarea"
                          :rows="4" />
                      </li>
                    </ul>
                  </div>

                  <div class="change-button">
                    <button @click="handleEducation">确定</button>
                    <button class="button-left" @click="isHiddenEducation = false">取消</button>
                  </div>
                </div>

              </div>

            </div>
            <div style="height:20px"></div>
          </div>

        </div>

        <!-- 项目经历 -->
        <div>
          <div style="height:15px;background-color:#faf9f9;"></div>
          <!-- 项目经历 -->
          <div class="common">
            <div style="height:20px"></div>
            <div class="nohidden" :class="{ 'hidden': isHiddenProject }">
              <div class="title">
                <h3 style="float:left">项目经历</h3>
                <span class="edit-button" @click="addProject"><el-icon :size="23">
                    <CirclePlus />
                  </el-icon></span>
              </div>
              <div class="text" @mouseover="displayProject = false" @mouseleave="displayProject = true"
                v-for="(pro, index) in resumeInfo.project" :key="index">
                <div>
                  <span><b>{{ pro.name }}</b></span>
                  <span style="margin-left:20px;font-size:12px">{{ pro.startTime }} - {{ pro.endTime }}</span>
                  <span class="edit-button" :class="{ 'hidden': displayProject }" @click="updateProject(pro)">/编辑</span>
                  <span class="edit-button" :class="{ 'hidden': displayProject }" @click="delProject(pro.id)">删除</span>

                </div>
                <div class="logtext">
                  <p style="font-size:14px">项目背景:{{ pro.background }}</p>
                  <p style="font-size:14px;margin-bottom:20px">项目职责:{{ pro.performance }}</p>
                </div>
              </div>
            </div>
            <!-- 修改项目经历 -->
            <div class="yeshidden" :class="{ 'hidden': !isHiddenProject }">
              <div class="change-title">
                <h3>项目经历</h3>
              </div>

              <div class="change-text">
                <div style="height:20px"></div>
                <!-- 修改信息 -->

                <div style="min-height:450px;height:auto">
                  <div class="info">
                    <ul>
                      <li class="float-left">
                        <p>项目名称</p>
                        <input type="text" v-model="project.name">
                      </li>
                      <li class="float-right">
                        <p>项目时间</p>
                        <el-date-picker v-model="project.startTime" type="month" placeholder="开始时间"
                          value-format="YYYY-MM-DD" style="height:35px;width:130px" /> --
                        <el-date-picker v-model="project.endTime" type="month" placeholder="结束时间"
                          value-format="YYYY-MM-DD" style="height:35px;width:130px" />
                      </li>
                      <li class="text-area">
                        <p>项目职责</p>
                        <el-input v-model="project.performance" placeholder="Please input" type="textarea" :rows="4" />
                      </li>
                      <li class="text-area">
                        <p>项目简介</p>
                        <el-input v-model="project.background" placeholder="Please input" type="textarea" :rows="4" />
                      </li>
                    </ul>
                  </div>

                  <div class="change-button">
                    <button @click="handleProject">确定</button>
                    <button class="button-left" @click="isHiddenProject = false">取消</button>
                  </div>
                </div>

              </div>

            </div>
            <div style="height:20px"></div>
          </div>

        </div>

        <div style="height:15px;background-color:#faf9f9;"></div>

      </el-col>


      <!-- 页面右侧 -->
      <el-col :span="8">
        <div class="grid-content ep-bg-purple" />

        <div class="notity">
          <Notify></Notify>
        </div>
      </el-col>

      <!-- 新用户首次需填写信息/编辑基本信息 -->
      <el-dialog v-model="dialogVisible" :title="title" width="30%" center :before-close="handleClose">
        <el-form :model="baseForm">
          <el-form-item label="居住地" label-width="80px">
            <el-input v-model="baseForm.home" autocomplete="off" />
          </el-form-item>
          <el-form-item label="年龄" label-width="80px">
            <el-input v-model="baseForm.age" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别" label-width="80px">
            <el-radio-group v-model="baseForm.sex" class="ml-4">
              <el-radio label=0 size="large">男</el-radio>
              <el-radio label=1 size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">重置</el-button>
            <el-button @click="dialogVisible = false" v-if="!isFirst">取消</el-button>
            <el-button type="primary" @click="handleResume">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 编辑头像 -->
      <el-dialog v-model="avatarVisible" title="上传头像" width="30%">
        <el-upload class="avatar-uploader" action="/api/file/upload" :headers="headerObject" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="upload-avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="avatarVisible = false">取消</el-button>
            <el-button type="primary" @click="handleAvatar">确认</el-button>
          </span>
        </template>
      </el-dialog>

    </el-row>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted } from '@vue/runtime-core'
import { bus } from 'vue3-eventbus'
import api from '@/api/resume'
import user from '@/api/user'
import Notify from '@/views/Dropdown/notify'
import { markRaw } from 'vue'
import { Delete } from '@element-plus/icons-vue'
export default {
  components: {
    Notify
  },

  setup() {

    const resumeInfo = {
      personalSummary: '',
      ability: '',
      jobIntention: '',
      performance: '',
      value: '3',
    }
    const baseForm = {
      userId: 0,
      age: '',
      home: '',
      sex: 0
    }
    const imageUrl = ref('')

    const title = ref('修改基本信息')
    const headerObject = {
      token: sessionStorage.getItem("token")
    }
    const userInfo = ref({})
    // 学历列表
    const options = [
      {
        value: '0',
        label: '高中',
      },
      {
        value: '1',
        label: '专科',
      },
      {
        value: '2',
        label: '本科',
      },
      {
        value: '3',
        label: '研究生',
      },
      {
        value: '4',
        label: '博士研究生',
      },
    ]
    const form = ref('')

    const education = ref({
      name: '',
      major: '',
      descriptions: '',
      endTime: '',
      startTime: '',
      resumeId: 0,
      diploma: ''
    })

    const experience = ref({
      name: '',
      position: '',
      performance: '',
      endTime: '',
      startTime: '',
      resumeId: 0,
    })

    const project = ref({
      name: '',
      performance: '',
      endTime: '',
      startTime: '',
      resumeId: 0,
      background: ''
    })

    const state = reactive({
      resumeInfo,
      baseForm,
    })

    const tf = reactive({
      isAddExper: true,
      isAddEdu: true,
      isAddPro: true,
      displayProject: true,
      displayEducation: true,
      displayExperience: true,
      isFirst: false,
      dialogVisible: false,
      avatarVisible: false,
      isHiddenSummary: false,
      isHiddenAbility: false,
      isHiddenBaseInfo: false,
      isHiddenExpet: false,
      isHiddenExperience: false,
      isHiddenProject: false,
      isHiddenEducation: false,
    })

    // 弹窗关闭前的操作
    const handleClose = () => {
      if (tf.isFirst) {

        console.log(state.baseForm);

        if (state.baseForm.nickName == '' || state.baseForm.age == '' || state.baseForm.sex == '' || state.baseForm.home == '') {
          tf.dialogVisible = true
          ElMessage.error("请将信息填写完整")
        } else {
          ElMessageBox.confirm('是否保存信息？')
            .then(() => {
              addResumeInfo()
            })
            .catch(() => {
              // catch error
            })
        }
      }

      if (!tf.isFirst) {
        tf.dialogVisible = false
      }

    }
    // 重置数据
    const handleRest = () => {

    }

    // 点击返回顶部
    function returnTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }

    // 获取页面高度
    function handleScroll() {
      bus.on('topValue', (msg) => {
        if (msg > 100) {
          tf.isTop = false
        } else {
          tf.isTop = true
        }
      })
    }

    function updateAvatar() {
      tf.avatarVisible = true
    }


    function handleAvatar() {
      tf.avatarVisible = false
      const requestData = {
        id: userInfo.value.id,
        avatar: imageUrl.value
      }
      user.updateAvatar(requestData).then((result) => {
        ElMessage.success("上传成功！审核中。。")
      }).catch((err) => {

      });
    }

    function handleAvatarSuccess(respose) {
      console.log(respose);
      imageUrl.value = respose.msg
    }

    //添加简历基本信息，只有新用户才可以
    function addResumeInfo() {
      state.baseForm.userId = userInfo.value.id
      api.addResumeInfo(state.baseForm).then((result) => {
        ElMessage.success(result.msg)
        getResumeById()
      }).catch((err) => {

      });

      tf.dialogVisible = false
    }

    // 添加工作经历
    function addExperience() {
      tf.isAddExper = true
      tf.isHiddenExperience = true
      experience.value = {}
    }
    // 添加教育经历
    function addEducation() {
      tf.isAddEdu = true
      tf.isHiddenEducation = true
      education.value = {}
    }
    // 添加项目经历
    function addProject() {
      tf.isAddPro = true
      tf.isHiddenProject = true
      project.value = {}
    }
    // 操作简历基本信息
    function handleResume() {
      if (tf.isFirst) {
        addResumeInfo()
      }

      if (!tf.isFirst) {

        console.log(state.baseForm);
        state.baseForm.userId = userInfo.value.id
        state.baseForm.id = state.resumeInfo.id

        api.updateResumeInfo(state.baseForm).then((result) => {
          ElMessage.success(result.msg)
          tf.dialogVisible = false
          state.resumeInfo.age = state.baseForm.age
          state.resumeInfo.home = state.baseForm.home
          state.resumeInfo.sex = state.baseForm.sex
        }).catch((err) => {

        });
      }
    }
    // 操作工作经历
    function handleExperience() {
      if (tf.isAddExper) {
        console.log(experience.value);
        console.log("我是添加");
        experience.value.resumeId = state.resumeInfo.id
        api.addExperience(experience.value).then((result) => {
          ElMessage.success(result.msg)
          getExperienceByResumeId()
        }).catch((err) => {

        });
      }

      if (!tf.isAddExper) {
        console.log(experience.value);
        console.log("我是修改");
        experience.value.resumeId = state.resumeInfo.id
        api.updateExperience(experience.value).then((result) => {
          ElMessage.success(result.msg)
          getExperienceByResumeId()
        }).catch((err) => {

        });
      }

      tf.isHiddenExperience = false

    }

    // 操作教育经历
    function handleEducation() {
      if (tf.isAddEdu) {
        console.log(education.value);
        console.log("我是添加");
        education.value.resumeId = state.resumeInfo.id

        api.addEducation(education.value).then((result) => {
          ElMessage.success(result.msg)
          getEduByResumeId()
        }).catch((err) => {

        });
      }

      if (!tf.isAddEdu) {
        console.log(education.value);
        console.log("我是修改");
        education.value.resumeId = state.resumeInfo.id
        api.updateEducation(education.value).then((result) => {
          ElMessage.success(result.msg)
          getEduByResumeId()
        }).catch((err) => {

        });
      }

      tf.isHiddenEducation = false

    }

    // 操作项目经历
    function handleProject() {
      if (tf.isAddPro) {
        console.log(project.value);
        console.log("我是添加");
        project.value.resumeId = state.resumeInfo.id

        api.addProject(project.value).then((result) => {
          ElMessage.success(result.msg)
          getProjectByResumeId()
        }).catch((err) => {

        });
      }

      if (!tf.isAddPro) {
        console.log(project.value);
        console.log("我是修改");
        project.value.resumeId = state.resumeInfo.id
        api.updateProject(project.value).then((result) => {
          ElMessage.success(result.msg)
          getProjectByResumeId()
        }).catch((err) => {

        });

      }

      tf.isHiddenProject = false

    }

    // 删除工作经历
    const delExperience = (val) => {
      ElMessageBox.confirm(
        '此操作将删除内容,是否继续?',
        '警告',
        {
          type: 'warning',
          icon: markRaw(Delete),
        }
      ).then(() => {
        api.deleteExperience(val).then((result) => {
          ElMessage.success(result.msg)
          getExperienceByResumeId()
        }).catch((err) => {

        });
      })

    }
    // 删除教育经历
    const delEducation = (val) => {
      ElMessageBox.confirm(
        '此操作将删除内容,是否继续?',
        '警告',
        {
          type: 'warning',
          icon: markRaw(Delete),
        }
      ).then(() => {
        api.deleteEducation(val).then((result) => {
          ElMessage.success(result.msg)
          getEduByResumeId()
        }).catch((err) => {

        });
      })

    }
    // 删除项目经历
    const delProject = (val) => {
      ElMessageBox.confirm(
        '此操作将删除内容,是否继续?',
        '警告',
        {
          type: 'warning',
          icon: markRaw(Delete),
        }
      ).then(() => {
        api.deleteProject(val).then((result) => {
          ElMessage.success(result.msg)
          getProjectByResumeId()
        }).catch((err) => {

        });
      })

    }

    // 修改项目经历
    const updateProject = (val) => {
      tf.isAddPro = false
      tf.isHiddenProject = true

      console.log(state.resumeInfo.project);
      project.value = val
    }
    // 修改教育经历
    const updateEducation = (val) => {
      tf.isAddEdu = false
      tf.isHiddenEducation = true
      education.value = val
    }
    // 修改工作经历
    const updateExper = (val) => {
      tf.isAddExper = false
      tf.isHiddenExperience = true
      experience.value = val
    }

    // 修改简历基本信息
    const updateResumeInfo = () => {
      title.value = '修改简历基本信息'
      tf.isFirst = false
      tf.dialogVisible = true
      state.baseForm.age = state.resumeInfo.age
      state.baseForm.home = state.resumeInfo.home
      state.baseForm.sex = state.resumeInfo.sex
    }

    // 根据简历id获取实习经历
    function getExperienceByResumeId() {
      api.getExperByResumeId(state.resumeInfo.id).then((result) => {
        state.resumeInfo.experience = result.data
      }).catch((err) => {

      });
    }

    // 根据简历id获取教育经历
    function getEduByResumeId() {
      api.getEduByResumeId(state.resumeInfo.id).then((result) => {
        state.resumeInfo.education = result.data
      }).catch((err) => {

      });
    }
    // 根据简历id获取项目经历
    function getProjectByResumeId() {
      api.getProjectByResumeId(state.resumeInfo.id).then((result) => {
        state.resumeInfo.project = result.data
      }).catch((err) => {

      });
    }

    // 更新个人能力
    function updateAbility() {
      const requestData = {
        id: state.resumeInfo.id,
        userId: userInfo.value.id,
        ability: form.value
      }

      console.log(requestData);

      api.updateResumeInfo(requestData).then((result) => {
        ElMessage.success(result.msg)
      }).catch((err) => {

      });

      tf.isHiddenAbility = false
      state.resumeInfo.ability = form.value


    }

    // 更新个人总结
    function updateSummary() {

      const requestData = {
        id: state.resumeInfo.id,
        userId: userInfo.value.id,
        personalSummary: form.value
      }

      console.log(requestData);

      api.updateResumeInfo(requestData).then((result) => {
        ElMessage.success(result.msg)
      }).catch((err) => {

      });

      tf.isHiddenSummary = false
      state.resumeInfo.personalSummary = form.value

    }

    // 更新求职期望
    function updateExpect() {

      const requestData = {
        id: state.resumeInfo.id,
        userId: userInfo.value.id,
        jobIntention: form.value
      }

      console.log(requestData);

      api.updateResumeInfo(requestData).then((result) => {
        ElMessage.success(result.msg)
      }).catch((err) => {

      });

      tf.isHiddenExpet = false
      state.resumeInfo.jobIntention = form.value

    }

    function handleEdit(val) {

      form.value = val

    }

    // 根据登录用户获取简历信息
    function getResumeById() {
      api.getResumeByUserId(userInfo.value.id).then((result) => {
        if (result.data == null) {
          title.value = "添加基本信息"
          tf.isFirst = true
          tf.dialogVisible = true
          ElMessage.warning("请添加个人基本信息")
        } else {
          state.resumeInfo = result.data
          getEduByResumeId()
          getExperienceByResumeId()
          getProjectByResumeId()
        }

      }).catch((err) => {

      });
    }

    // 获取登录的用户信息
    function getUserInfo() {
      user.getUserInfo().then((result) => {
        userInfo.value = result.data
        getResumeById()
    }).catch((err) => {
        
    });
    }

    onMounted(() => {
      getUserInfo()
      handleScroll()
    })


    return {
      ...toRefs(tf),
      ...toRefs(state),
      title,
      userInfo,
      project,
      education,
      experience,
      imageUrl,
      getUserInfo,
      form,
      options,
      headerObject,
      getResumeById,
      handleEdit,
      handleClose,
      handleRest,
      handleResume,
      handleAvatarSuccess,
      handleAvatar,
      updateAvatar,
      updateAbility,
      updateSummary,
      updateExpect,
      addExperience,
      addEducation,
      addProject,
      delProject,
      delEducation,
      delExperience,
      updateExper,
      updateProject,
      updateEducation,
      updateResumeInfo,
      handleExperience,
      handleEducation,
      handleProject,
    }
  }


}
</script>

<style lang="less" scoped>
.notity {
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
}

.upload-avatar {
  width: 200px;
  height: 120px;
}

.common {
  width: 100%;
  height: auto;
  background-color: #fff;
  margin: auto;
  text-align: left;

  .nohidden {
    width: 677px;
    height: auto;
    margin: 10px auto;

    .title {
      height: 30px
    }

    .text {
      border-radius: 5px;
      min-height: 40px;
      text-align: left;
      margin-top: 5px;

      .logtext {
        height: auto;

        p {
          margin-top: 15px;
        }
      }
    }

    .text:hover {
      background-color: #f6f8fb;
    }
  }

  .yeshidden {

    width: 100%;
    height: auto;

    .change-title {
      width: 677px;
      margin: auto;
    }

    .change-text {
      background-color: #f6f8fb;
      width: 100%;
      margin-top: 10px;

      .change-input {
        width: 677px;
        margin: auto;

      }

    }


  }
}

.hidden {
  display: none;
}

.edit-button {
  float: right;
  color: #ff6400;
  cursor: pointer;
}

.change-baseInfo {
  background-color: #f6f8fb;
  width: 100%;
  height: 480px;
  margin-bottom: 20px;

  .change-avatar {
    width: 85%;
    margin: auto;
    height: 100px;
  }
}

.info {
  width: 85%;
  height: auto;
  margin: auto;

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  .date-input {
    float: left,
  }

  .text-area {
    width: 100%;
    float: left;
    height: auto;

  }

  li {
    width: 300x;
    height: 60px;
    margin-bottom: 30px;

    p {
      margin-bottom: 5px;
    }

    input {
      width: 280px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid gray;
      outline: #ff6400;
    }

    input:hover {
      border: 1px solid #ff6400;
    }
  }

}


.change-button {
  width: 677px;
  margin: 20px auto;
  height: 60px;

  .button-left {
    border: 1px solid #ff6400;
    background-color: #fff;
    color: #ff6400;
  }

  button {
    background-color: #ff6400;
    width: 80px;
    height: 40px;
    float: right;
    color: #fff;
    border-radius: 5%;
    border: none;
    margin-left: 40px;
  }
}



.baseInfo {
  width: 100%;
  margin-left: 30px;
  height: 100px;

  .avatar-right {
    width: 77%;
    float: left;

    li {
      float: left;
      margin-right: 20px;

      span {
        font-size: 15px;
        margin-left: 2px;
      }

    }

    .username {
      width: 100%;
      height: 30px;
    }

    .icon-text {
      height: 20px;
      margin-top: 10px;
    }
  }

  .avatar {
    width: 100px;
    height: 100px;
    float: left;
    cursor: pointer;

    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

}
</style>>