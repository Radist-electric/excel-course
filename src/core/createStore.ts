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
