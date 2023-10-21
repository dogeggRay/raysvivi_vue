const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.ts', // 入口文件
      title: '大雷子子'
    }
  }
})
