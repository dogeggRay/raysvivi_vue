const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.ts', // 入口文件
      title: '小雷童鞋'
    }
  }
})
