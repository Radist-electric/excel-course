import {Dom} from 'core/Dom';

export class Page {
	params: any;

	constructor (params?: any) {
		this.params = params;
	}

	getRoot (): Dom {
		throw new Error('Method "getRoot" should be implemented');
	}

	afterRender (): void {}

	destroy (): void {}
}
