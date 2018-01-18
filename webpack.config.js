// webpack.config.js
//
const env = process.env.NODE_ENV;

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const autoprefixer = require('autoprefixer')
const path = require('path');

module.exports = {
   entry:  path.join(__dirname, 'client', 'app.js'),
   output: {
      path: path.join(__dirname, 'client', 'static'),
      filename: './js/bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            include: [
               path.resolve(__dirname, "client")
            ],
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ['env', 'react', 'stage-2']
               }
            }
         },
         { 
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: [
                  {
                     loader: 'css-loader',
                     options: {
                        modules: true,
                        localIdentName: '[local]__[hash:base64:5]',
                        importLoaders: 1,
                        sourceMap: true,
                        minimize: true
                     }
                  },
                  {
                     loader: 'postcss-loader',
                     options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: [autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'IE >= 9']})]
                     }
                  }
               ]
            })        
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Live Auction',
         template: './resources/template.html',
      }),
      new UglifyJSPlugin({
         sourceMap: true
      }),
      new ExtractTextPlugin({
         filename: './css/style.[contenthash:5].css',
         allChunks: true,
         disable: false
      })
   ]
}
