import {$, Dom} from 'core/Dom';
import {ActiveRoute} from 'core/routes/ActiveRoute';
import {PageType, RoutesType} from 'types';

export class Router {
	/**
	 * DOM элемент placeholder
	 */
	$placeholder: Dom;
	/**
	 * Маршруты
	 */
	routes: RoutesType;
	/**
	 * Страница
	 */
	page: PageType | null = null;

	constructor (selector: string, routes: RoutesType) {
		if (!selector) {
			throw new Error('Selector is not provided in Router');
		}

		this.$placeholder = $(selector);
		this.routes = routes;
		this.changePageHandler = this.changePageHandler.bind(this);
		this.init();
	}

	/**
	 * Инициализирует Router
	 * @returns {void}
	 */
	init (): void {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	/**
	 * Обрабатывает изменение страницы
	 * @returns {void}
	 */
	changePageHandler (): void {
		if (this.page) {
			this.page.destroy();
		}

		this.$placeholder.clear();

		const Page = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard;

		this.page = new Page(ActiveRoute.param);

		if (this.page) {
			this.$placeholder.append(this.page.getRoot());
			this.page.afterRender();
		}
	}

	/**
	 * Демонтирует Router
	 * @returns {void}
	 */
	destroy (): void {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
