const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production';
	const isDev = !isProd;

	const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;
	const plugins = () => {
		const base = [
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'src', 'favicon.ico'),
						to: path.resolve(__dirname, 'build')
					}
				]
			}),
			new HtmlWebpackPlugin({
				template: './index.html'
			}),
			new MiniCssExtractPlugin({
				filename: filename('css')
			})
		];

		if (isDev) {
			base.push(new ESLintPlugin());
		}

		return base;
	};

	return {
		context: path.resolve(__dirname, 'src'),
		devServer: {
			hot: true,
			open: true,
			port: '3000',
			watchFiles: './'
		},
		devtool: isDev ? 'source-map' : false,
		entry: {
			main: [
				'core-js/stable',
				'regenerator-runtime/runtime',
				'./index.ts'
			]
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: filename('js'),
			clean: true
		},
		plugins: plugins(),
		resolve: {
			extensions: ['.js', '.ts'],
			alias: {
				'components': path.resolve(__dirname, 'src', 'components'),
				'core': path.resolve(__dirname, 'src', 'core'),
				'data': path.resolve(__dirname, 'src', 'data'),
				'helpers': path.resolve(__dirname, 'src', 'helpers'),
				'scss': path.resolve(__dirname, 'src', 'scss'),
				'types': path.resolve(__dirname, 'src', 'types'),
				'utils': path.resolve(__dirname, 'src', 'utils')
			}
		},
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.(ttf|woff|woff2|eot|svg)$/,
					type: 'asset/resource',
					include: [
						path.resolve(__dirname, 'src/fonts')
					],
					generator: {
						filename: 'fonts/[hash][ext][query]'
					}
				},
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript'
							]
						}
					}
				}
			]
		}
	};
};
