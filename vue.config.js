module.exports = {
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