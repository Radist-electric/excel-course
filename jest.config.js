module.exports = {
	moduleDirectories: [
		'components',
		'core',
		'data',
		'helpers',
		'node_modules',
		'redux',
		'styles',
		'types',
		'utils'
	],
	moduleFileExtensions: [
		'js',
		'ts'
	],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
		'^components/(.*)$': '<rootDir>/src/components/$1',
		'^core/(.*)$': '<rootDir>/src/core/$1',
		'^data/(.*)$': '<rootDir>/src/data/$1',
		'^helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^redux/(.*)$': '<rootDir>/src/redux/$1',
		'^styles/(.*)$': '<rootDir>/src/styles/$1',
		'^types/(.*)$': '<rootDir>/src/types/$1',
		'^utils/(.*)$': '<rootDir>/src/utils/$1'
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: [
		'/build/',
		'/node_modules/',
		'__mocks__/*'
	],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s?$',
	transform: {
		'^.+\\.[t|j]sx?$': 'ts-jest'
	},
	verbose: true
};
