import {$, Dom} from 'core/Dom';
// import {ActiveRoute} from 'core/routes/ActiveRoute';
import {PageType, RoutesType} from 'types';

export class Router {
	$placeholder: Dom;
	routes: RoutesType;
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

	init () {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	changePageHandler () {
		const Page = this.routes.excel;
		const page = new Page();

		this.$placeholder.append(page.getRoot());

		page.afterRender();
	}

	destroy () {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
