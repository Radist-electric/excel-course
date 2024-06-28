import {Dom} from 'core/Dom';
import {DomListener} from 'core/DomListener';
import {Emitter} from 'core/Emitter';
import {OptionsType} from 'core/types';
import {VoidFuncWithArgs} from 'types';

export class ExcelComponent extends DomListener {
	emitter: Emitter;
	unsubscribers: VoidFuncWithArgs[];

	constructor (
		$root: Dom,
		options: OptionsType = {
			emitter: new Emitter()
		}
	) {
		super($root, options.listeners);

		this.emitter = options.emitter;
		this.name = options.name || '';
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
	}
}
