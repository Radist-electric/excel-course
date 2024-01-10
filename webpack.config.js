const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: [
			'core-js/stable',
			'regenerator-runtime/runtime',
			'./index.js'
		],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CopyPlugin({
			patterns: [
				{ 
					from: path.resolve(__dirname, 'src', 'favicon.ico'), 
					to: path.resolve(__dirname, 'build') 
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css'
		})
	],
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src', 'core'),
		}
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		],
	}
}