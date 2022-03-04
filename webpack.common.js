const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development'; // 是否是开发模式
console.log(process.env.NODE_ENV, 'devMode')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  profile: true,
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'myWebpack',
      // inject: 'body',
      // filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 输出文件名
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      ignoreOrder: true
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //   }
    // }),
  ],
  module: {
    strictExportPresence: true,
    unknownContextCritical: false,
    exprContextCritical: false,
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }]
      },
      // {
      //   test: lessRegex,
      //   exclude: lessModuleRegex,
      //   use: [
      //     'style-loader',
      //     'cache-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         sourceMap: devMode,
      //       }
      //     },
      //     'postcss-loader',
      //     {
      //       loader: 'less-loader',
      //       options:
      //         { sourceMap: devMode, lessOptions: { javascriptEnabled: true, modules: true, } }
      //     }
      //   ],
      //   sideEffects: true,
      // },
      // {
      //   test: lessModuleRegex,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       // options: {
      //       //   modules: {
      //       //     getLocalIdent: getCSSModuleLocalIdent,
      //       //   }
      //       // }
      //     },
      //     "postcss-loader",
      //     "less-loader"
      //   ]
      // },
      {
        test: /\.(css|less)$/,
        use: [
          devMode ? "style-loader" :
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // 当前的css所在的文件相对于打包后的根路径dist的相对路径
                publicPath: '../',
                // hmr: devMode,
                // reloadAll: true
              }
            },
          { loader: 'css-loader', options: { sourceMap: devMode, importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: devMode
            }
          },
          {
            loader: 'less-loader',
            options:
              { sourceMap: devMode, lessOptions: { javascriptEnabled: true } }
          }
        ],
        sideEffects: true,
      },
      {
        test: /\.jpg$/i,
        type: 'asset',
        // generator: {
        //   filename: 'src/[name][ext]',
        // },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024
          }
        }
      }
    ]
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: devMode ? false : 'single',
    // usedExports: true,
    // minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '.', 'src'),
      'hocComponents': path.join(__dirname, '.', 'src/hocComponents'),
      'pages': path.join(__dirname, '.', 'src/pages'),
    },
    extensions: ['.jsx', '.js', '.css', '.less', '...']
  }
}
