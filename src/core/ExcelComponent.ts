import {Dom} from 'core/Dom';
import {DomListener} from 'core/DomListener';
import {OptionsType} from './types';

export class ExcelComponent extends DomListener {
	constructor ($root: Dom, options: OptionsType = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
	}

	// Возвращает шаблон компонента
	toHTML () {
		return '';
	}

	init () {
		this.initDOMListeners();
	}

	destroy () {
		this.removeDOMListeners();
	}
}
