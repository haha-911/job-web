<template>

    <el-row :gutter="20">
        <!-- 左侧区域 -->
        <el-col :span="16">
            <div class="grid-content ep-bg-purple" />

            <div class="r-menu">

                <div style="height:10px"></div>
                <el-menu :default-active="activeIndex" active-text-color="#ff6400" class="el-menu-demo"
                    mode="horizontal" @select="handleSelect" router>
                    <el-menu-item index="/apply">我的投递</el-menu-item>
                    <el-menu-item index="/interview">我的面试</el-menu-item>
                    <el-menu-item index="/favor">我的收藏<span v-if="isFavor">({{ favorCount }})</span></el-menu-item>
                    <el-menu-item index="/follow">我的关注<span v-if="isFollow">({{ followCount }})</span></el-menu-item>
                </el-menu>

            </div>

            <div class="r-content">
                <router-view />
            </div>

        </el-col>


        <!-- 右侧区域 -->
        <el-col :span="8">
            <div class="grid-content ep-bg-purple" />

        </el-col>
    </el-row>



</template>

<script>

import { getConstantType } from '@vue/compiler-core';
import { useRoute } from 'vue-router';
import { bus } from 'vue3-eventbus';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

export default {
    components: {

    },


    setup() {
        const followCount = ref(0)
        const favorCount = ref(0)
        const Route = useRoute()
        const isFollow = ref(false)
        const isFavor = ref(false)

        const activeIndex = Route.path

        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath);
        }

        function getCount() {

            bus.on('followTotal', (msg) => {
                if (msg > -1) {
                    isFollow.value = true
                    followCount.value = msg
                }
            })
            bus.on('favorTotal', (msg) => {
                if (msg > -1) {
                    isFavor.value = true
                    favorCount.value = msg
                }
            })
        }

        onMounted(() => {
            getCount()
        })

        return {
            isFollow,
            isFavor,
            favorCount,
            followCount,
            getCount,
            Route,
            activeIndex,
            handleSelect,
        }

    }

}
</script>


<style lang="less" scoped>
.r-menu {
    width: 70%;
    margin: auto;

    .el-menu-demo li:hover {
        background-color: #fff;
        color: #ff6400
    }




}

.r-content {
    width: 70%;
    margin: auto;
    margin-bottom: 30px;
}
</style>