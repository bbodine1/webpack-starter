const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [
      './src/js/index.js',
      './src/scss/styles.scss'
    ]
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(svg|gif|png|jpe?g)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './img/[name].[ext]',
              limit: 10 * 1024
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                minimize: true,
                plugins: (loader) => [
                  require('autoprefixer')()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/assets', to: '' }]),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      filename: './index.html'
    }),
    new HtmlWebPackPlugin({
      template: './src/404.html',
      favicon: './src/favicon.ico',
      filename: './404.html'
    }),
    new ExtractTextPlugin({
      filename: './styles.css'
    })
  ],
};