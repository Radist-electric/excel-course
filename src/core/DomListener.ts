import {Dom} from 'core/Dom';
import {ListenerType} from 'types';
import {getMethodName} from 'utils/common';

export class DomListener {
	$root: Dom;
	listeners: ListenerType[];
	name: string;

	constructor ($root: Dom, listeners: ListenerType[] = []) {
		if (!$root) {
			throw new Error(`No $root provided for DomListener!`);
		}

		this.$root = $root;
		this.listeners = listeners;
		this.name = '';
	}

	initDOMListeners () {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener) as keyof this;

			if (!this[method]) {
				const name = this.name;

				throw new Error(
					`Method ${String(method)} is not implemented in ${name} Component`
				);
			}

			// @ts-ignore
			this[method] = this[method].bind(this);
			// @ts-ignore
			this.$root.on(listener, this[method]);
		});
	}

	removeDOMListeners () {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener) as keyof this;

			// @ts-ignore
			this.$root.off(listener, this[method]);
		});
	}
}
