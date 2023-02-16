<template>

    <div class="goTop" :class="{'hidden':isHidden}" @click="returnTop">
        <el-icon :size="24" style="margin-top:5px"><ArrowUpBold /></el-icon>
        <div style="font-size:13px"><span>TOP</span></div>
    </div>
  
</template>

<script>
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core';
import { bus } from 'vue3-eventbus';
export default {

    setup(){

        const isHidden = ref(true)

        
        // 记录当前的滚动距离
        const scrollTop = ref(0);

        // 监听滚动距离
        const handleScroll = () => {

            window.addEventListener('scroll', () => {
                // 当前距离顶部的距离
                let top = document.documentElement.scrollTop || document.body.scrollTop;

                scrollTop.value = top;
                bus.emit('topValue', top)
                // console.log(top);
                if (scrollTop.value > 100) {
                    isHidden.value = false
                } else {
                    isHidden.value = true
                }

            });
        }

        // 点击返回顶部
        const returnTop = () => {

            let top = scrollTop.value

            // 实现滚动效果 
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 30;
                if (top <= 0) {
                    clearInterval(timeTop);
                }
            }, 10);

        }

        onMounted(()=>{
            handleScroll()

        })

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', () => { }); // 离开当前组件别忘记移除事件监听
        })

        return {
            isHidden,
            scrollTop,
            returnTop,
            handleScroll,

        }
    }

}
</script>

<style lang="less" scoped>
.goTop{
    cursor: pointer;
    position:fixed;
    right: 30px;
    bottom: 120px;
    background-color:blanchedalmond;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    .goTop:hover{
      background-color: #409eff;
    }
  }
.hidden{
    display: none;
}
  

</style>