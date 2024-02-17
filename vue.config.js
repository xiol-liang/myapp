const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
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
