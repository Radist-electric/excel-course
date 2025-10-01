import {Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {OptionsType} from 'core/types';

export class ExcelStateComponent extends ExcelComponent {
	state: Record<string, any> = {};

	// eslint-disable-next-line no-useless-constructor
	constructor ($root: Dom, options: OptionsType) {
		super($root, options);
	}

	get template (): string {
		return JSON.stringify(this.state, null, 2);
	}

	/**
	 * Инициализирует состояние компонента
	 * @param {Record<string, any>} initialState - начальное состояние
	 * @returns {void}
	 */
	initState (initialState: Record<string, any> = {}): void {
		this.state = {...initialState};
	}

	/**
	 * Обновляет состояние компонента и перерисовывает его
	 * @param {Record<string, any>} newState - новое состояние для обновления
	 * @returns {void}
	 */
	setState (newState: Record<string, any>): void {
		this.state = {...this.state, ...newState};
		this.$root.html(this.template);
	}
}
