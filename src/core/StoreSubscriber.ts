import {Action, State, Store} from 'redux/types';
import {isEqual} from 'utils/common';

export class StoreSubscriber {
	private store: Store<State, Action>;
	private sub: {unsubscribe: () => void} | null;
	private prevState: State;

	constructor (store: Store<State, Action>) {
		this.store = store;
		this.sub = null;
		this.prevState = {} as State;
	}

	subscribeComponents (components: any[]) {
		this.prevState = this.store.getState();

		this.sub = this.store.subscribe((state: State) => {
			Object.keys(state).forEach(key => {
				if (!isEqual(this.prevState[key as keyof State], state[key as keyof State])) {
					components.forEach(component => {
						if (component.isWatching && component.isWatching(key)) {
							const changes = {[key]: state[key as keyof State]};

							component.storeChanged(changes);
						}
					});
				}
			});

			this.prevState = this.store.getState();
		});
	}

	unsubscribeFromStore () {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
}
