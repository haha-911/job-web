<template>
        <div class="footer-content">
            <div style="height:30px"></div>
            <el-row  style="margin-top:30px">
                <el-col :span="8" class="left-col"><div class="grid-content ep-bg-purple" />
                <div><img src="../../assets/joblogo.png" alt="" style="height:36px;width:97px;float:left"/></div>
                <div style="margin-top:60px">
                <p>企业服务热线和算法推荐/未成年人举报渠道：</p>
                <p><b>15036242563</b></p>
                <p style="font-size:10px">工作日9:00-19:00</p>
                <p><b>beibei@qq.com</b></p>
            </div>
            </el-col>
                <el-divider direction="vertical" style="height:184px"/>
                <el-col :span="15" class="right-col"><div class="grid-content ep-bg-purple-light" />
                    <p>Copyright© 2020 All Rights Reserved. </p>
                    <p style="font-size:14px">成都纺织高等专科学校--电气信息技术工程学院</p>
                    <p style="font-size:13px"> 地址:四川省成都市郫都区泰山南街186号 邮编:546199&nbsp;&nbsp;&nbsp; 电话:0772-6620787</p>
                </el-col>
              </el-row>
        </div>

</template>

<script>
export default {

}
</script>

<style>

.left-col p{
    font-size: 14px;
    margin: 15px auto;
    text-align: left;
}

.right-col{
    margin-top:50px;
}

.right-col p{
    margin: 15px auto;
    
}

.footer-content {
    width: 70%;
    margin: auto;

}
</style>