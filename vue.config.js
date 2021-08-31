module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: [], 省略后缀
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
