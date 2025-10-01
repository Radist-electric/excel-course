declare global {
	module '*.gif'
	module '*.png'
	module '*.svg'

	module '*.scss' {
		const resource: Record<string, string>;
		export = resource;
	}
}
