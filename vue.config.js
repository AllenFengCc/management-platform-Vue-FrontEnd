let proxyObj = {}
proxyObj['/apis'] = {
  target: 'http://127.0.0.1:8085/',
  pathRewrite: { '^/apis': '' },
  changeOrigin: true
}

module.exports = {
  // 前端端口
  devServer: {
    // 解决vue下nginx反向代理Invalid Host header问题
    historyApiFallback: true,
    allowedHosts: 'all',

    host: '127.0.0.1',
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    proxy: proxyObj,
  },

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'CF ERP Sys [Dev]'
      return args
    })
  },
}


