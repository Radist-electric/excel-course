import {Dom} from 'core/Dom';

export class Page {
	/**
	 * Параметры страницы
	 */
	params: any;

	constructor (params?: any) {
		this.params = params || Date.now().toString();
	}

	/**
	 * Возвращает корневой элемент страницы
	 * @returns {Dom | Promise<Dom>} корневой элемент страницы
	 */
	getRoot (): Dom | Promise<Dom> {
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
