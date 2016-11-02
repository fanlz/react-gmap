var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./main.js",
  output: {
    path: './build/',
    filename: "index.js"
  },
  devServer: {
    inline: true,
    port: 3334
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
          test: /\.css$/,
          loader:ExtractTextPlugin.extract('style', 'css?sourceMap!')
      },
      // {
      //   test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
      //   loader : 'file-loader'
      // }, 
      {
          test: /\.scss$/,
          loader:ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap!url')
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractTextPlugin('bundle.css',{
      allChunks: true
    })
  ]
};
