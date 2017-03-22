var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
	config.set({
		browsers: ['jsdom'],
		singleRun: true,
		frameworks: ['mocha'],
		reporters: ['mocha', 'coverage', 'junit'],

		files: [
			'./tests.webpack.js'
		],

		preprocessors: {
			'./tests.webpack.js': ['webpack', 'sourcemap']
		},

		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /node_modules/,
						loader: 'babel'
					},
					{
						test: /\.jsx?$/,
						include: path.resolve('src/'),
						loader: 'isparta'
					},
					{
						test: /\.svg$|\.png$/,
						include: path.resolve('src/images/'),
						exclude: /node_modules/,
						loader: 'url-loader?limit=8192'
					},
					{
						test: /\.scss$/,
						exclude: /node_modules/,
						loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'resolve-url', 'postcss', 'sass']
					},
					{ test: /\.css$/, loader: 'style!css' },
					{
						test: /\.json$/,
						loader: 'json-loader'
					},
					{
						test: /\.woff$/,
						loader: 'url-loader?limit=1000000'
					},
					{
						test: /\.woff2$/,
						loader: 'url-loader?limit=1000000'
					},
					{
						test: /\.gif$/,
						loader: 'url-loader?limit=1000000'
					}
				]
			},

			node: {
				fs: 'empty',
				net: 'empty'
			},

			externals: {
				'react/addons': true,
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': true
			}
		},

		webpackMiddleware: {
			noInfo: true,
			stats: {
				chunks: false
			}
		},

		coverageReporter: {
			dir: 'coverage',
			reporters: [
				{ type: 'html', subdir: 'html' },
				{ type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
			]
		},

		junitReporter: {
			outputDir: '',
			outputFile: 'test-results.xml',
			useBrowserName: false
		}
	});
};
