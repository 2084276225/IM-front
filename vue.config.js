const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8700',
        secure: false,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }

    }
  }
})
