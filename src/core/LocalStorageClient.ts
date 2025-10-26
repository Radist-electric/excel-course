import {State} from 'redux/types';
import {getStorageName, storage} from 'utils/common';

export class LocalStorageClient {
	private readonly name: string;

	constructor (name: string) {
		this.name = getStorageName(name);
	}

	save (state: State): Promise<void> {
		storage(this.name, state);
		return Promise.resolve();
	}

	get (): Promise<State> {
		return new Promise(resolve => {
			const state = storage(this.name);

			setTimeout(() => {
				resolve(state);
			}, 1000);
		});
	}
}
