const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production';
	const isDev = !isProd;

	const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`


	return {
		context: path.resolve(__dirname, 'src'),
		devtool: isDev ? 'source-map' : false,
		entry: {
			main: [
				'core-js/stable',
				'regenerator-runtime/runtime',
				'./index.js'
			],
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: filename('js')
		},
		plugins: [
			new CleanWebpackPlugin(),
			new CopyPlugin({
				patterns: [
					{ 
						from: path.resolve(__dirname, 'src', 'favicon.ico'), 
						to: path.resolve(__dirname, 'build') 
					},
				],
			}),
			new HtmlWebpackPlugin({
				template: './index.html'
			}),
			new MiniCssExtractPlugin({
				filename: filename('css')
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
}