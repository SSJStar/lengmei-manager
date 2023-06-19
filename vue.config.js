const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    disableHostCheck:true,
    https:false,
    proxy:"http://hvac.365env.com",
    // proxy: {
    //   '/api': {
    //     // https://result.eolink.com/XCtnfMJ85f813d3a7847f14c01592a467dbb707990534d0?uri=/user/list
    //     target: 'https://result.eolink.com', //接口域名
    //     // changeOrigin: true, //是否跨域
    //     // ws: true, //是否代理 websockets
    //     secure: true, //是否https接口
    //     pathRewrite: {
    //       //路径重置
    //       "^/api": "",
    //     },
    //   },
    //   '/yisuanyun': {
    //     target: 'http://hvac.365env.com"', //接口域名
    //     changeOrigin: true, //是否跨域
    //     // ws: true, //是否代理 websockets
    //     secure: false, //是否https接口
    //     pathRewrite: {
    //       //路径重置
    //       "^/yisuanyun": "",
    //     },
    //   },
    // },
  },
})
