import {capitalize} from 'utils/utils';
import {Dom} from 'core/Dom';
import {ListenersType} from './types';

export class DomListener {
	$root: Dom;
	listeners: ListenersType;
	name: string;

	constructor($root: Dom, listeners: ListenersType = []) {
		if (!$root) {
			throw new Error(`No $root provided for DomListener!`);
		}

		this.$root = $root;
		this.listeners = listeners;
		this.name = '';
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);

			if (!this[method]) {
				const name = this.name;

				throw new Error(
					`Method ${method} is not implemented in ${name} Component`
				);
			}
			// Тоже самое что и addEventListener
			this.$root.on(listener, this[method].bind(this));
		});
	}

	removeDOMListeners() {
		// realize!
	}
}

// input => onInput
function getMethodName(eventName: string): string {
	return 'on' + capitalize(eventName);
}
