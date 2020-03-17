// https://github.com/vuejs/vue-cli/tree/dev/docs/config

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000/',
        pathRewrite: {
          '/api': '', // remove base path
        },
        logLevel: 'debug',
      },
    },
  },
};
