const path = require('path')

const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const exctractPlugin = new ExtractTextPlugin({
  filename: 'static/bundle-[hash].css'
})

module.exports = {
  entry: ['./client/client.js'],
  output: {
    path: path.resolve(__dirname, './client-dist'),
    publicPath: '/',
    filename: 'static/bundle-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      },
      {
        test: /\.(ogg|mp3|ico|jpg|png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/img/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  devServer: {
    noInfo: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'client-dist'),
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, 'client'), 'node_modules']
  },
  plugins: [
    exctractPlugin,
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'client/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'game.html',
      template: 'client/game.html'
    }),
    new CleanWebpackPlugin(['client-dist'])
  ]
}

if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = 'eval-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    })
  ])
}

if (process.env.NODE_ENV !== 'development') {
  module.exports.devtool = 'source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        comparisons: false,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ])
}
