import {Action, State, Store} from 'redux/types';
import {isEqual, isProdMode} from 'utils/common';

export class StoreSubscriber {
	/**
	 * Хранилище
	 */
	private store: Store<State, Action>;
	/**
	 * Подписка
	 */
	private sub: {unsubscribe: () => void} | null;
	/**
	 * Предыдущее состояние
	 */
	private prevState: State;

	constructor (store: Store<State, Action>) {
		this.store = store;
		this.sub = null;
		this.prevState = {} as State;
	}

	/**
	 * Подписывает компоненты на изменения состояния
	 * @param {any[]} components - компоненты
	 * @returns {void}
	 */
	subscribeComponents (components: any[]): void {
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

			if (isProdMode()) {
				window.redux = this.prevState;
			}
		});
	}

	/**
	 * Отписывается от хранилища
	 * @returns {void}
	 */
	unsubscribeFromStore (): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
}
