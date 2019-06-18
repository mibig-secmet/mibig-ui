const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: common.output.path,
    proxy: {
      '/api': 'http://localhost:6424'
    }
  },
});
