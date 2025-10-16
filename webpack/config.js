'use strict';

const {build, development, mode} = require('./define');
const loaders = require('./loaders');
const plugins = require('./plugins');
const resolve = require('./resolve');

module.exports = {
	devServer: {
		host: 'localhost',
		hot: true,
		open: true
	},
	devtool: development ? 'source-map' : false,
	entry: './src/index.ts',
	mode,
	module: loaders,
	output: {
		filename: '[name].[contenthash].js',
		path: build
	},
	performance: {
		maxAssetSize: 800000,
		maxEntrypointSize: 100000
	},
	plugins,
	resolve,
	target: development ? 'web' : 'browserslist'
};
