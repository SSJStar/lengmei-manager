const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // disableHostCheck:true,
    // https:false,
    // proxy:"http://hvac.365env.com",
    proxy: {
      '/api': {
        // https://result.eolink.com/XCtnfMJ85f813d3a7847f14c01592a467dbb707990534d0?uri=/user/list
        target: 'https://result.eolink.com', //接口域名
        // changeOrigin: true, //是否跨域
        // ws: true, //是否代理 websockets
        secure: true, //是否https接口
        pathRewrite: {
          //路径重置
          "^/api": "",
        },
      },
      '/yisuanyun': {
        target: 'http://hvac.365env.com"', //接口域名
        changeOrigin: true, //是否跨域
        // ws: true, //是否代理 websockets
        secure: false, //是否https接口
        pathRewrite: {
          //路径重置
          "^/yisuanyun": "",
        },
      },
    },
  },
  // publicPath: process.env.NODE_ENV === 'production' ? '/sub-directory/' : '/'
  publicPath: ''
})

// devServer：选项用于配置开发服务器。你可以根据实际需求进行配置，例如设置代理、改变默认端口等。
// publicPath：选项用于配置项目的基本路径。默认情况下，Vue项目的基本路径是 / ，即根目录。