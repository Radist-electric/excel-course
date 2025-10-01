import {Dom} from 'core/Dom';

export class Page {
	/**
	 * Параметры страницы
	 */
	params: any;

	constructor (params?: any) {
		this.params = params;
	}

	/**
	 * Возвращает корневой элемент страницы
	 * @returns {Dom} корневой элемент страницы
	 */
	getRoot (): Dom {
		throw new Error('Method "getRoot" should be implemented');
	}

	/**
	 * Вызывается после рендера страницы
	 * @returns {void}
	 */
	afterRender (): void {}

	/**
	 * Вызывается перед уничтожением страницы
	 * @returns {void}
	 */
	destroy (): void {}
}
