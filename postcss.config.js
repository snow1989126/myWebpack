// // module.exports = {
// // plugins: [
// //   require('postcss-preset-env'),
// //   require('precss'),
// //   require('autoprefixer')
// // ],
// // plugins: {
// //   precss: {},
// //   'postcss-preset-env': {},
// //   'postcss-plugin-px2rem': {
// //     rootValue: 100,
// //     propBlackList: ['border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
// //   }
// // },
// // }

const postcssNormalize = require('postcss-normalize');

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
      }
    ],
    postcssNormalize(),
    require('autoprefixer')({
      overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
    })
  ],
};