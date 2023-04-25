<template>

    <!-- 首页搜索模块 -->
    <el-row :gutter="20">
        <!-- 搜索区域 -->
        <el-col :span="16">
            <div class="grid-content ep-bg-purple" />
            <!-- 搜索框 -->
            <div class="search">
                <div class="search-inner">
                    <input class="search-input" v-model="key" placeholder="搜索职位/公司/内容关键词" />
                    <button color="#ff6400" class="search-button" @click="searchPosition">搜索</button>
                </div>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content ep-bg-purple" />expect
        </el-col>
    </el-row>

    <!-- 首页搜索模块css -->
    <div>
        .search {
            height: 60px;
            margin-top: 20px;
           
            .search-inner {
              height: 50px;
              border-radius: 40px;
              background-color: #fff;
              box-shadow: 0px 0px 10px 5px #aaa;
            
            }
            .search-inner:hover {
              border: 2px solid #ff6400;
            }
            .search-input {
              width: 600px;
              height: 30px;
              margin-top: 10px;
              margin-left: 10px;
              outline: none;
              border: none;
            
            }
            .search-button {
              float: right;
              color: #fff;
              font-size: 16px;
              margin-right: 10px;
              margin-top: 5px;
              border-radius: 40px;
              width: 75px;
              height: 40px;
              line-height: 20px;
              border: none;
              background-color: #ff6400;
            
            }
            
          }
    </div>


</template>