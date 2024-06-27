import {Dom} from 'core/Dom';
import {DomListener} from 'core/DomListener';
import {Emitter} from 'core/Emitter';
import {OptionsType} from 'core/types';

export class ExcelComponent extends DomListener {
	emitter: Emitter;

	constructor (
		$root: Dom,
		options: OptionsType = {
			emitter: new Emitter()
		}
	) {
		super($root, options.listeners);

		this.emitter = options.emitter;
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
