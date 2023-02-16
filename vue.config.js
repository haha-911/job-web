const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port:8086,  // 端口号的配置
    open:true , // 自动打开浏览器
    // 前端跨域配置
    proxy: {
        '/api':{
            target:'http://localhost:8080',
            ws:true,
            changeOrigin:true,
            pathRewrite:{
                '^/api':''
            }
        }
    }
}


})
