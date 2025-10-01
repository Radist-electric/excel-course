const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

		return base;
	};

	return {
		context: path.resolve(__dirname, 'src'),
		devServer: {
			hot: true,
			open: true,
			port: '3001',
			watchFiles: './'
		},
		devtool: isDev ? 'source-map' : false,
		entry: './index.ts',
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
					generator: {
						filename: 'fonts/[hash][ext][query]'
					},
					include: [
						path.resolve(__dirname, 'src/fonts')
					],
					test: /\.(ttf|woff|woff2|eot|svg)$/,
					type: 'asset/resource'
				},
				{
					exclude: /node_modules/,
					test: /\.ts$/,
					use: {
						loader: 'ts-loader',
						options: {
							transpileOnly: isDev
						}
					}
				}
			]
		},
		output: {
			clean: true,
			filename: filename('js'),
			path: path.resolve(__dirname, 'build')
		},
		performance: {
			maxAssetSize: 1024000,
			maxEntrypointSize: 256000
		},
		plugins: plugins(),
		resolve: {
			alias: {
				'components': path.resolve(__dirname, 'src', 'components'),
				'core': path.resolve(__dirname, 'src', 'core'),
				'data': path.resolve(__dirname, 'src', 'data'),
				'helpers': path.resolve(__dirname, 'src', 'helpers'),
				'redux': path.resolve(__dirname, 'src', 'redux'),
				'scss': path.resolve(__dirname, 'src', 'scss'),
				'types': path.resolve(__dirname, 'src', 'types'),
				'utils': path.resolve(__dirname, 'src', 'utils')
			},
			extensions: ['.js', '.ts']
		}
	};
};
