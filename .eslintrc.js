module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['eslint:recommended', 'google'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		babelOptions: {
			configFile: './babel.config.json'
		}
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		'brace-style': ['error', '1tbs'],
		'comma-dangle': ['error', 'only-multiline'],
		'curly': ['error', 'all'],

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
		'multiline-ternary': ['error', 'always-multiline'],
		'no-extend-native': ['error', {'exceptions': ['String']}],
		'no-param-reassign': 'error',
		'no-tabs': 'off',
		'object-curly-spacing': ['error', 'never'],
		'operator-linebreak': ['error', 'before'],
		'prefer-spread': ['off'],
		'quote-props': ['error', 'consistent'],

		'require-jsdoc': 'off',
		'semi': ['error', 'always'],
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/comma-dangle': ['error'],
		'@typescript-eslint/indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1
			}
		]
	}
};
