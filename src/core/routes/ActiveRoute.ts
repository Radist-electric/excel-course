export class ActiveRoute {
	/**
	 * Возвращает путь
	 * @returns {string} путь
	 */
	static get path (): string {
		return window.location.hash.slice(1);
	}

	/**
	 * Возвращает параметр
	 * @returns {string} параметр
	 */
	static get param (): string {
		return ActiveRoute.path.split('/')[1];
	}

	/**
	 * Переходит по пути
	 * @param {string} path - путь
	 * @returns {void}
	 */
	static navigate (path: string): void {
		window.location.hash = path;
	}
}
