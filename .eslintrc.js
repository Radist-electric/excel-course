module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: [
		'plugin:@nsmp/rules/recommended-js',
		'plugin:@nsmp/rules/recommended-ts',
		'plugin:@nsmp/rules/recommended-custom-rules'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		babelOptions: {
			configFile: './babel.config.json'
		}
	},
	plugins: [
		'@nsmp/rules'
	],
	rules: {}
};
