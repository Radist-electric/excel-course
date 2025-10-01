'use strict';

const {src} = require('./define');
const {resolve} = require('path');

module.exports = {
	alias: {
		'components': resolve(src, 'components'),
		'core': resolve(src, 'core'),
		'data': resolve(src, 'data'),
		'helpers': resolve(src, 'helpers'),
		'redux': resolve(src, 'redux'),
		'styles': resolve(src, 'styles'),
		'types': resolve(src, 'types'),
		'utils': resolve(src, 'utils')
	},
	extensions: ['.ts', '.js']
};
