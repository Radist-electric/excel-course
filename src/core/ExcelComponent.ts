import {Dom} from 'core/Dom';
import {DomListener} from 'core/DomListener';
import {OptionsType} from './types';

export class ExcelComponent extends DomListener {
	constructor ($root: Dom, options: OptionsType = {}) {
		super($root, options.listeners);

		this.name = options.name || '';
		this.prepare();
	}

	// Возвращает шаблон компонента
	toHTML () {
		return '';
	}

	prepare () {}

	init () {
		this.initDOMListeners();
	}

	destroy () {
		this.removeDOMListeners();
	}
}
