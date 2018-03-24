const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'app', 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
