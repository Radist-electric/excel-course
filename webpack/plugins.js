'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {version} = require('./define');
const webpack = require('webpack');

const plugins = [
	new CopyWebpackPlugin({
		patterns: [
			{
				from: './src/favicon.ico',
				to: 'favicon.ico'
			}
		]
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		meta: {
			version
		},
		template: './src/index.html',
		title: 'Pure JavaScript Excel'
	}),
	new MiniCssExtractPlugin({
		chunkFilename: '[id].css',
		filename: '[contenthash].css'
	}),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	})
];

module.exports = plugins;
