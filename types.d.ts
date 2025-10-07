import State from 'redux/types';

declare global {
	interface Window {
		redux: State
	}

	module '*.gif'
	module '*.png'
	module '*.svg'

	module '*.scss' {
		const resource: Record<string, string>;
		export = resource;
	}
}
