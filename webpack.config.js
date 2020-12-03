const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//固定写法
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const babelpolyfill = require("babel-polyfill");
const HappyPack = require('happypack');
const os = require('os');
// 获取电脑硬件的cpu核心数，准备开启多线程构建
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const Webpack = require('webpack')


module.exports = {
	//配置环境
	mode:'development',// "production" | "development" | "none"
	//多入口写法：
	entry:{
		//chunk名称：入口文件路径
		index:'./src/index.js'
	},
	//如何输出结果的相关选项
	output:{
		// 所有输出文件的目标路径
		path:path.resolve(__dirname,"public"),
		// 输出的文件的文件名:[name]:chunk名称，[hash]:模块标识符，每次打包hash都不同
		filename:"[name]-[hash]-bundle.js",
		publicPath:'/' //让所有的静态资源都在根目录下
	},
	//配置别名
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'./src/pages'),
			util:path.resolve(__dirname,'./src/util'),
			images:path.resolve(__dirname,'./src/images'),
			common:path.resolve(__dirname,'./src/common'),
			api:path.resolve(__dirname,'./src/api')
		}
	},
	performance: {//关闭警告提示
		hints:false
	},
	devtool:process.env.NODE_ENV == 'production' ? false : 'inline-source-map',//生产环境时直接不设置source-map,提高项目构建效率
	module:{//webpack自身只支持javascript,而loader能够让webpack处理那些非javascript文件
		rules:[
		//处理css
			{
				test: /\.css$/,
	            use: [
	              {
	                loader: MiniCssExtractPlugin.loader,
	                options: {
	                }
	              },
	              "css-loader?modules"//开启CSS Modules
	            ]
			},
			//处理图片
			{
				test:/\.(png|jpg|gif|ico)$/i,
				use:[
					{//url-loader默认使用file-loader处理图片文件，需要额外安装file-loader
						loader:'url-loader',
						options:{//当图片大小超过limit值时，会生成一个文件，
							limit:10
						}
					}
				]
			},
			{//happypack改装babel-loader,提高构建效率
			    test:/\.js$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'happypack/loader?id=js',
			    }               
			},
			{
				test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
					loader: 'css-loader', // translates CSS into CommonJS
					// options:{
					// 	modules:true
					// },
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            'primary-color': '#7897cc',
                            'link-color': '#7897cc',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    },
                }],
            }
		]
	},
	plugins:[
	//自动生成html代码配置
		new HtmlWebpackPlugin({
			template:'./src/index.html',//模板文件
			filename:'index.html',//输出的文件名
			// inject:'head',//脚本卸载哪个标签里,默认是true,在body后引进
			hash:true,//给生成的js/css文件添加一个唯一的hash
			chunks:['index'],//可以设置自动引进哪一个文件
			favicon: path.resolve('src/favicon.ico'), //favicon.ico文件路径
			minify: { // 压缩HTML文件
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true, // 删除空白符与换行符
				minifyCSS: true// 压缩内联css
			}
		}),
		new HappyPack({
			id:'js',
			loaders:[{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,// 开启babel缓存，第二次构建时，会读取之前的缓存
					presets: ['env', 'react','stage-0'],
					plugins: [//处理antd按需加载
						["import", {
							"libraryName": "antd",
							"libraryDirectory": "es", 
							"style": true // `style: true` 会加载 less 文件
						}],
						
					]
				}
			}],
			threads:4,
			threadPool: happyThreadPool
		}),
		//  new ParallelUglifyPlugin ({//打包上线所用
		// 	// 混淆压缩js文件 
		// 	uglifyJS:{
		// 		output: {
		// 		  beautify: false,
		// 		  comments: false
		// 		},
		// 		warnings: false,
		// 		compress: {
		// 		  // 删除所有的 `console` 语句，可以兼容ie浏览器
		// 		  drop_console: true,
		// 		  // 内嵌定义了但是只用到一次的变量
		// 		  collapse_vars: true,
		// 		  // 提取出出现多次但是没有定义成变量去引用的静态值
		// 		  reduce_vars: true,
		// 		}
		// 	  }			
		// }),		
		// new CompressionWebpackPlugin({//压缩打包体积
		// 	filename: "[path].gz[query]",  //压缩后的文件策略
		// 	algorithm: 'gzip',
		// 	// 需要压缩的资源
		// 	test:  /\.(js|css|jpg|jpeg|html|ico|png)(\?.*)?$/i, // 开启gzip压缩， 按需写入
		// 	// 只处理比这个值大的资源。按字节计算
		// 	threshold: 10240,
		// 	deleteOriginalAssets: false, // 是否删除原文件
		// 	// 只有压缩率比这个值小的资源才会被处理
		// 	minRatio: 0.8
		// }),
		//打包第三方库设置缓存，提高打包速度 
		new HardSourceWebpackPlugin(),	
		//自动清理无用文件
		new CleanWebpackPlugin(),
		//单独打包css文件
		new MiniCssExtractPlugin({}),
		//自定义插件，使得全局可以判断环境
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
		})
	],
	devServer:{
		inline:true,
		hot:true,
		contentBase:'./dist',//内容的目录
		port:'8000',//服务运行的端口,可以手动更改端口，但是修改后要重新打包
		historyApiFallback:true,//让h5路由刷新页面时不会向后台发送数据
		proxy:{
			"/api/rays":{
				target:"https://bigbi.raysyun.com/",
				ws: true,
				pathRewrite: {'^/api/rays' : ''},
				changeOrigin:true,
				secure:false
			}
		}
	}
}
