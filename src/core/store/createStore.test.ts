import {CreateStore} from './createStore';
import {CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from 'redux/actionTypes';
import {rootReducer} from 'redux/rootReducer';
import {Action, State} from 'redux/types';

describe('Класс CreateStore', () => {
	let store: CreateStore;
	let initialState: State;

	beforeEach(() => {
		initialState = {
			colState: {},
			currentStyles: {},
			currentText: '',
			dataState: {},
			lastOpenedAt: 0,
			rowState: {},
			stylesState: {},
			tableTitle: 'Новая таблица',
			title: 'Новая таблица'
		};
		store = new CreateStore(rootReducer, initialState);
	});

	it('создает экземпляр с начальным состоянием', () => {
		expect(store).toBeInstanceOf(CreateStore);
		expect(store.getState()).toEqual(initialState);
	});

	it('инициализирует пустой массив слушателей', () => {
		expect(store.listeners).toEqual([]);
	});

	it('сохраняет переданный rootReducer', () => {
		expect(store.rootReducer).toBe(rootReducer);
	});

	describe('Метод getState', () => {
		it('возвращает текущее состояние', () => {
			const state = store.getState();

			expect(state).toEqual(initialState);
		});

		it('возвращает актуальное состояние после dispatch', () => {
			const action: Action = {
				data: {id: 'A:1', value: 'Тест'},
				type: CHANGE_TEXT
			};

			store.dispatch(action);

			const newState = store.getState();

			expect(newState.currentText).toBe('Тест');
			expect(newState.dataState['A:1']).toBe('Тест');
		});
	});

	describe('Метод dispatch', () => {
		it('обновляет состояние через rootReducer', () => {
			const action: Action = {
				data: {id: 'A:1', value: 'Новый текст'},
				type: CHANGE_TEXT
			};

			store.dispatch(action);

			const state = store.getState();

			expect(state.currentText).toBe('Новый текст');
			expect(state.dataState['A:1']).toBe('Новый текст');
		});

		it('уведомляет всех слушателей о изменении состояния', () => {
			const listener1 = jest.fn();
			const listener2 = jest.fn();

			store.subscribe(listener1);
			store.subscribe(listener2);

			const action: Action = {
				data: 'Новый заголовок',
				type: CHANGE_TITLE
			};

			store.dispatch(action);

			expect(listener1).toHaveBeenCalledWith(store.getState());
			expect(listener2).toHaveBeenCalledWith(store.getState());
		});

		it('передает актуальное состояние слушателям', () => {
			const listener = jest.fn();

			store.subscribe(listener);

			const action: Action = {
				data: {id: 'A', type: 'col', value: 200},
				type: TABLE_RESIZE
			};

			store.dispatch(action);

			expect(listener).toHaveBeenCalledWith(store.getState());
			expect(store.getState().colState[('A' as unknown) as number]).toBe(200);
		});

		it('не изменяет состояние при неизвестных действиях', () => {
			const action: Action = {
				data: 'test',
				type: 'UNKNOWN_ACTION'
			};

			const originalState = store.getState();

			store.dispatch(action);

			expect(store.getState()).toEqual(originalState);
		});
	});

	describe('Метод subscribe', () => {
		it('добавляет слушателя в массив listeners', () => {
			const listener = jest.fn();

			store.subscribe(listener);

			expect(store.listeners).toContain(listener);
		});

		it('возвращает объект с методом unsubscribe', () => {
			const listener = jest.fn();
			const subscription = store.subscribe(listener);

			expect(subscription).toHaveProperty('unsubscribe');
			expect(typeof subscription.unsubscribe).toBe('function');
		});

		it('возвращает функцию unsubscribe, которая удаляет слушателя из массива', () => {
			const listener = jest.fn();
			const subscription = store.subscribe(listener);

			expect(store.listeners).toContain(listener);

			subscription.unsubscribe();

			expect(store.listeners).not.toContain(listener);
		});

		it('возвращает функцию unsubscribe, которая удаляет только указанного слушателя', () => {
			const listener1 = jest.fn();
			const listener2 = jest.fn();

			store.subscribe(listener1);
			store.subscribe(listener2);

			expect(store.listeners).toHaveLength(2);

			const subscription1 = store.subscribe(listener1);

			subscription1.unsubscribe();

			expect(store.listeners).toHaveLength(1);
			expect(store.listeners).toContain(listener2);
			expect(store.listeners).not.toContain(listener1);
		});

		it('не вызывает удаленного слушателя при dispatch', () => {
			const listener = jest.fn();
			const subscription = store.subscribe(listener);

			subscription.unsubscribe();

			const action: Action = {
				data: 'Новый заголовок',
				type: CHANGE_TITLE
			};

			store.dispatch(action);

			expect(listener).not.toHaveBeenCalled();
		});
	});
});
