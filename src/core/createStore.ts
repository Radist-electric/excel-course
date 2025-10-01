import {Action, RootReducer, State, Store} from 'redux/types';

/**
 * Создаёт хранилище
 * @param {RootReducer<State, Action>} rootReducer - корневой редюсер
 * @param {State} initialState - начальное состояние
 * @returns {Store<State, Action>} хранилище
 */
export function createStore (
	rootReducer: RootReducer<State, Action>,
	initialState: State
): Store<State, Action> {
	let state = rootReducer(initialState, {type: '__INIT__'});
	let listeners: Array<(state: State) => void> = [];

	return {
		dispatch (action: Action): void {
			listeners.forEach(listener => listener(state));
			state = rootReducer(state, action);
		},
		getState () {
			return state;
		},
		subscribe (fn: (state: State) => void): {unsubscribe: () => void} {
			listeners.push(fn);
			return {
				unsubscribe () {
					listeners = listeners.filter(listener => listener !== fn);
				}
			};
		}
	};
}

/**
 * Создаёт хранилище
 * @param {RootReducer<State, Action>} rootReducer - корневой редюсер
 * @param {State} initialState - начальное состояние
 * @returns {Store<State, Action>} хранилище
 */
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

	/**
	 * Вызывает действие
	 * @param {Action} action - действие
	 * @returns {void}
	 */
	dispatch (action: Action): void {
		// Сначала обновляем state,
		this.state = this.rootReducer(this.state, action);
		// а потом уже передаём информацию в слушатели, чтобы подписчики получили актуальную информацию.
		this.listeners.forEach(listener => listener(this.state));
	}

	/**
	 * Возвращает состояние
	 * @returns {State} состояние
	 */
	getState (): State {
		return this.state;
	}

	/**
	 * Подписывается на изменения состояния
	 * @param {Function} fn - функция, которая будет вызываться при изменении состояния
	 * @returns {Object} объект с функцией отписки
	 */
	subscribe (fn: (state: State) => void): {unsubscribe: () => void} {
		this.listeners.push(fn);
		return {
			unsubscribe: () => {
				this.listeners = this.listeners.filter(listener => listener !== fn);
			}
		};
	}
}
