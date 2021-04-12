module.exports = {
  publicPath: '/www/start/dist/',
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      axios: 'axios',
      moment: 'moment',
      'element-ui': 'ELEMENT',
    }
  }
}
