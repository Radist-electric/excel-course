import {Dom} from 'core/Dom';
import {DomListener} from 'core/DomListener';
import {Emitter} from 'core/Emitter';
import {OptionsType} from 'core/types';
import {Action, State, Store} from 'redux/types';
import {VoidFuncWithArgs} from 'types';

export class ExcelComponent extends DomListener {
	emitter: Emitter;
	params?: string;
	store: Store<State, Action>;
	storeSub: {unsubscribe: () => void} | null;
	subscribe: string[];
	unsubscribers: VoidFuncWithArgs[];

	constructor (
		$root: Dom,
		options: OptionsType
	) {
		super($root, options.listeners);

		this.emitter = options.emitter;
		this.name = options.name || '';
		this.params = options.params;
		this.store = options.store;
		this.storeSub = null;
		this.subscribe = options.subscribe || [];
		this.unsubscribers = [];
		this.prepare();
	}

	/**
	 * Настраивает компонент до инициализации
	 * @returns {void}
	 */
	prepare (): void {}

	/**
	 * Возвращает шаблон компонента
	 * @returns {string} шаблон компонента
	 */
	toHTML (): string {
		return '';
	}

	/**
	 * Уведомляет слушателей про событие event
	 * @param {string} event - эмиттируемое событие
	 * @param {any} args - параметры, передаваемые вместе с событием
	 * @returns {void}
	 */
	$emit (event: string, ...args: any): void {
		this.emitter.emit(event, ...args);
	}

	/**
	 * Подписывает на событие event
	 * @param {string} event - событие, на которое выполняется подписка
	 * @param {VoidFuncWithArgs} fn - функция, вызываемая при наступлении события
	 * @returns {void}
	 */
	$on (event: string, fn: VoidFuncWithArgs): void {
		const unsubscribe = this.emitter.subscribe(event, fn);

		this.unsubscribers.push(unsubscribe);
	}

	/**
	 * Вызывает действие
	 * @param {Action} action - действие
	 * @returns {void}
	 */
	$dispatch (action: Action): void {
		this.store.dispatch(action);
	}

	/**
	 * Подписывается на изменения состояния
	 * @param {Function} fn - функция, вызываемая при изменении состояния
	 * @returns {void}
	 */
	$subscribe (fn: (state: State) => void): void {
		this.storeSub = this.store.subscribe(fn);
	}

	/**
	 * Проверяет, подписан ли компонент на конкретное поле состояния
	 * @param {string} key - ключ поля состояния
	 * @returns {boolean} подписан ли компонент на это поле
	 */
	isWatching (key: string): boolean {
		return this.subscribe.includes(key);
	}

	/**
	 * Обрабатывает изменения состояния. Переопределяется в наследниках.
	 * @param {Partial<State>} changes - объект с изменениями состояния
	 * @returns {void}
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	storeChanged (changes: Partial<State>): void {}

	/**
	 * Инициализирует компонент. Добавляет DOM слушателей.
	 * @returns {void}
	 */
	init (): void {
		this.initDOMListeners();
	}

	/**
	 * Удаляет компонент. Чистит DOM слушатели.
	 * @returns {void}
	 */
	destroy (): void {
		this.removeDOMListeners();
		this.unsubscribers.forEach(unsubscribe => unsubscribe());
		this.storeSub?.unsubscribe();
	}
}
