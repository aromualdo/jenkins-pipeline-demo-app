var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var SITE_PATH = path.resolve(ROOT_PATH, 'site');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var WWW_PATH = path.resolve(ROOT_PATH, 'www');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

var common = {
	entry: SITE_PATH,

	output: {
		path: WWW_PATH,
		filename: '[name].bundle.js'
	},

	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
			{ test: /.json$/, loader: 'json' },
			{
				test: /\.(svg|png|jpg|gif|woff|woff2)$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},

	postcss: function () {
		return [autoprefixer, precss];
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Post Scheduler',
			template: path.resolve(SITE_PATH, 'index.html'),
			favicon: path.resolve(SITE_PATH, 'favicon.ico'),
			inject: false
		})
	]
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'source-map',
		module: {
			loaders: [
				{
					test: /\.s?css$/,
					loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'resolve-url', 'postcss', 'sass'],
					include: [ SITE_PATH, SRC_PATH ]
				},
				{ test: /\.css$/, loader: 'style!css' }
			]
		},
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			port: 3000,
			progress: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if (TARGET === 'build:site') {
	module.exports = merge(common, {
		entry: {
			site: SITE_PATH,
			vendor: Object.keys(pkg.dependencies)
		},
		output: {
			path: WWW_PATH,
			publicPath: `/${pkg.version}/`,
			filename: '[name].[chunkhash].js'
		},
		//this devtool option means that the source maps are much smaller
		devtool: 'cheap-module-source-map',
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!resolve-url!postcss!sass'),
					include: [SITE_PATH, SRC_PATH, path.resolve(ROOT_PATH, 'node_modules')]
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: [SITE_PATH, SRC_PATH, path.resolve(ROOT_PATH, 'node_modules')]
				}
			]
		},
		plugins: [
			new Clean(WWW_PATH),
			new ExtractTextPlugin('styles.[chunkhash].css'),
			new webpack.optimize.CommonsChunkPlugin(
				'vendor',
				'[name].[chunkhash].js'
			),
			new webpack.DefinePlugin({
				'process.env': {
					// This affects react lib size
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	});
}
