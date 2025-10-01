export class ActiveRoute {
	static get path (): string {
		return window.location.hash.slice(1);
	}

	static get param (): string {
		return ActiveRoute.path.split('/')[1];
	}
}
