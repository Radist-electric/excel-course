import {Action, RootReducer, State, Store} from 'redux/types';

export function createStore (
	rootReducer: RootReducer<State, Action>,
	initialState: State
): Store<State, Action> {
	let state = rootReducer(initialState, {type: '__INIT__'});
	let listeners: Array<(state: State) => void> = [];

	return {
		dispatch (action: Action) {
			listeners.forEach(listener => listener(state));
			state = rootReducer(state, action);
		},
		getState () {
			return state;
		},
		subscribe (fn: (state: State) => void) {
			listeners.push(fn);
			return {
				unsubscribe () {
					listeners = listeners.filter(listener => listener !== fn);
				}
			};
		}
	};
}

export class CreateStore {
	listeners: Array<(state: State) => void>;
	rootReducer: RootReducer<State, Action>;
	state: State;

	constructor (
		rootReducer: RootReducer<State, Action>,
		initialState: State
	) {
		this.listeners = [];
		this.rootReducer = rootReducer;
		this.state = rootReducer(initialState, {type: '__INIT__'});
	}

	dispatch (action: Action) {
		// Сначала обновляем state,
		this.state = this.rootReducer(this.state, action);
		// а потом уже передаём информацию в слушатели, чтобы подписчики получили актуальную информацию.
		this.listeners.forEach(listener => listener(this.state));
	}

	getState () {
		return this.state;
	}

	subscribe (fn: (state: State) => void) {
		this.listeners.push(fn);
		return {
			unsubscribe: () => {
				this.listeners = this.listeners.filter(listener => listener !== fn);
			}
		};
	}
}
