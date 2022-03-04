const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  // devServer: {
  //   static: './dist',
  //   hot: true
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, 'img'),
      // publicPath: '/assets',
    },
    compress: true,
    hot: true,
    port: 8080,
    open: true,
    historyApiFallback: true
    // client: { //在浏览器端打印编译进度
    //   progress: true,
    // },
  }
}
const devAllConfig = merge(common, devConfig);
module.exports = devAllConfig;