module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['eslint:recommended', 'google'],
	parser: '@babel/eslint-parser',
	parserOptions: {
		babelOptions: {
			configFile: './babel.config.json'
		}
	},
	rules: {
		'comma-dangle': ['error', 'never'],
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1
			}
		],
		'linebreak-style': 'off',
		'max-len': ['warn', {
			'code': 140,
			'tabWidth': 2,
			'ignoreComments': true,
			'ignoreTrailingComments': true,
			'ignoreTemplateLiterals': true,
			'ignoreRegExpLiterals': true,
			'ignorePattern': '^import [^,]+ from |^export'
		}],

		'no-tabs': 'off',
		'require-jsdoc': 'off',
		'semi': ['error', 'always']
	}
};
