const { defineConfig } = require('@vue/cli-service')

// 基本路径根据当前是生产环境还是开发环境来判断
let BASE_URL = process.env.NODE_ENV === 'production' ? '/myapp/' : '/'

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: BASE_URL
  // outputDir: 'dist',
  // assetsDir: 'xiol',  // 这里指定 xiol 目录作为静态资源输出目录
  // outputDir: 'dist',
  // configureWebpack: {
  //   output: {
  //     filename: 'xiol/xiol.[contenthash].js',
  //     chunkFilename: 'xiol/xiol.[contenthash].js'
  //   }
  // },
})
