	const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const webpack = require("webpack")
const { WebPlugin, AutoWebPlugin } = require('web-webpack-plugin')


module.exports = {
	mode: "development",
	entry: {
		app: './src/app.js',
  	},
	cache: true,
	externals: {
        "vue": "Vue",
        'vue-router': 'VueRouter'
    }, 
	resolve: {
		// 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
		// 其中 __dirname 表示当前工作目录，也就是项目根目录
		modules: [path.resolve(__dirname, 'node_modules')],
		alias: {
			'components': path.resolve(__dirname, './src/components/'), // 
			'vue-router': path.resolve(__dirname, './node_modules/vue-router/dist/vue-router.min.js'), // react15
			'vant':path.resolve(__dirname, './node_modules/vant')
		}
	},
	output: {
		publicPath:'//192.168.31.172:8088/',
		path: path.join(__dirname, "./dist"), //打包输出路径，必须是绝对路径
		filename: "[name].js" //打包之后的 JS 名称
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlwebpackPlugin({
			filename: 'index.html',
			// html template file path（full path relative to webpack.config.js）
			template: 'public/index.html',
		}),
		new HardSourceWebpackPlugin(),
		//new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				// *.js
				test: /\.js$/,
				exclude: /node_modules/, // 不编译node_modules下的文件
				loader: 'babel-loader?cacheDirectory=true',
				include: path.resolve(__dirname, 'src'),
			},
			{
				test: /\.(css)$/,        // 处理 css 
				use: [
					"style-loader",
					"css-loader",
					{
						loader: 'postcss-loader',
					}
				],
				//include: path.resolve(__dirname, 'src'),
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: "vue-loader"
					}
				]
			}
		]
	},
	devServer: {
		proxy: { 
            '/apiv1': {
                 target: 'http://localhost:8081/',
				 pathRewrite:{'/apiv1':''},
				 changeOrigin: true,     // target是域名的话，需要这个参数，
        		 secure: false,          // 设置支持https协议的代理 
            },
			'/pic': {
				target: 'http://localhost:8081/public',
				pathRewrite:{'/apiv1':''},
				changeOrigin: true,     // target是域名的话，需要这个参数，
				secure: false,          // 设置支持https协议的代理 
		   },
		   '/wp-content': {
			target: 'http://localhost:8081/public',
			pathRewrite:{'/apiv1':''},
			changeOrigin: true,     // target是域名的话，需要这个参数，
			secure: false,          // 设置支持https协议的代理 
	   		}  
        },
		contentBase: path.join(__dirname, "./dist"), //打包之后的目录
		open: true, //打包完成自动打开浏览器预览
		quiet: true, //隐藏在 terminal中显示打包信息
		progress: true, //显示打包进度 
		host:"192.168.31.172",
		port: 8088,  //不指定端口会自动分配
	},
};