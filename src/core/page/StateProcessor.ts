import {State} from 'redux/types';
import {debounce} from 'utils/common';

interface StorageClient {
	get(): Promise<State>,
	save(state: State): Promise<void>
}

export class StateProcessor {
	client: StorageClient;
	debouncedListen: (state: State) => void;

	constructor (client: StorageClient, delay: number = 300) {
		this.client = client;
		this.debouncedListen = debounce(this.listen.bind(this), delay);
	}

	listen (state: State): void {
		this.client.save(state);
	}

	get (): Promise<State> {
		return this.client.get();
	}
}
