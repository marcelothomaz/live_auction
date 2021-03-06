// webpack.config.js
//
const PROD = process.env.NODE_ENV === 'production'

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer')
const path = require('path');

module.exports = {
   entry:  ['babel-polyfill', path.join(__dirname, 'client', 'app.js')],
   devtool: "source-map",
   output: {
      path: path.join(__dirname, 'client', 'static/'),
      filename: './js/bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            include: [
               path.resolve(__dirname, "client/")
            ],
            exclude: [ /node_modules/ ],
            use: {
               loader: "babel-loader"
               // options: {
               //    presets: ['env', 'react', 'stage-2']
               // }
            }
         },
         { 
            test: /\.s?css$/,
            loader: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: [
                  {
                     loader: 'css-loader',
                     options: {
                        modules: true,
                        localIdentName: '[local]__[hash:base64:5]',
                        importLoaders: 2,
                        sourceMap: true,
                        minimize: PROD ? true : false
                     }
                  },
                  { 
                     loader: 'sass-loader',
                     options: {
                        sourceMap: true
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
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: path.join(__dirname,'client','static','fonts/')
                  }
               }
            ]
         }
      ]
   },
   plugins: PROD ? [
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      new HtmlWebpackPlugin({
         title: 'Live Auction',
         template: './resources/template.html',
      }),
      new UglifyJSPlugin({
         sourceMap: true,
         minify: PROD ? true : false
      }),
      new ExtractTextPlugin({
         filename: './css/[name].[contenthash:5].css',
         allChunks: true,
         disable: false
      })
   ] :  [
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      new HtmlWebpackPlugin({
         title: 'Live Auction',
         template: './resources/template.html',
      }),
      new ExtractTextPlugin({
         filename: './css/[name].[contenthash:5].css',
         allChunks: true,
         disable: false
      })
   ]
}
