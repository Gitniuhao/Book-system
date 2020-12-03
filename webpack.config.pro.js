/*
 * @Author: 牛皓
 * @Date: 2020-10-27 11:40:28
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-03 18:45:10
 * @FilePath: \BookSystem\webpack.config.pro.js
 */
const {merge} = require('webpack-merge')
const dev = require('./webpack.config')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = merge(dev,{
    mode:'production',
    plugins:[
         new ParallelUglifyPlugin ({//打包上线所用
			// 混淆压缩js文件 
			uglifyJS:{
				output: {
				  beautify: false,
				  comments: false
				},
				warnings: false,
				compress: {
				  // 删除所有的 `console` 语句，可以兼容ie浏览器
				  drop_console: true,
				  // 内嵌定义了但是只用到一次的变量
				  collapse_vars: true,
				  // 提取出出现多次但是没有定义成变量去引用的静态值
				  reduce_vars: true,
				}
			  }			
		}),		
		new CompressionWebpackPlugin({//压缩打包体积
			filename: "[path].gz[query]",  //压缩后的文件策略
			algorithm: 'gzip',
			// 需要压缩的资源
			test:  /\.(js|css|jpg|jpeg|html|ico|png)(\?.*)?$/i, // 开启gzip压缩， 按需写入
			// 只处理比这个值大的资源。按字节计算
			threshold: 10240,
			deleteOriginalAssets: false, // 是否删除原文件
			// 只有压缩率比这个值小的资源才会被处理
			minRatio: 0.8
		}),
    ]
})