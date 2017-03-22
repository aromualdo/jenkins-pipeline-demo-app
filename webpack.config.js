var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');

var LIBRARY_NAME = 'PostScheduler';

module.exports = {
	entry: './src/index.js',
	module: {
		loaders: [
			{ test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
			{ test: /.json$/, loader: 'json' },
			{ test: /\.scss$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!resolve-url!postcss!sass' },
			{ test: /\.css$/, loader: 'style!css' },
			{
				test: /\.(svg|png|jpg|gif|woff|woff2)$/,
				loader: 'url-loader?limit=250000'
			}
		]
	},
	externals: [{
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		}
	}],
	output: {
		filename: path.resolve(DIST_PATH, LIBRARY_NAME + '.js'),
		libraryTarget: 'umd',
		library: LIBRARY_NAME
	},
	plugins: [
		new CleanWebpackPlugin(DIST_PATH),
		new webpack.optimize.OccurenceOrderPlugin()
	]
};
