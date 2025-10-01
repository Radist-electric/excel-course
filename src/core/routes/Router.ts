import {$, Dom} from 'core/Dom';
import {ActiveRoute} from 'core/routes/ActiveRoute';
import {RoutesType} from 'types';
export class Router {
	$placeholder: Dom;
	routes: RoutesType;

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
		console.log(ActiveRoute.path);
		console.log('param', ActiveRoute.param);

		this.$placeholder.html('<h1>' + ActiveRoute.path + '</h1>');
	}

	destroy () {
		window.removeEventListener('hashchange', this.changePageHandler);
	}
}
