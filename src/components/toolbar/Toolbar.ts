import {createToolbar} from 'components/toolbar/toolbar.template';
import {$, Dom} from 'core/Dom';
import {ExcelStateComponent} from 'core/ExcelStateComponent';
import {OptionsType} from 'core/types';
import {DEFAULT_STYLES} from 'data/constants';
import {State} from 'redux/types';

export class Toolbar extends ExcelStateComponent {
	static classNames = 'excel__toolbar';

	constructor ($root: Dom, options: OptionsType) {
		super($root, {
			listeners: ['click'],
			name: 'Toolbar',
			subscribe: ['currentStyles'],
			...options
		});

		this.initState(DEFAULT_STYLES);
	}

	get template (): string {
		return createToolbar(this.state);
	}

	toHTML () {
		return this.template;
	}

	storeChanged (changes: Partial<State>) {
		if (changes.currentStyles) {
			this.setState(changes.currentStyles);
		}
	}

	onClick (event: Event) {
		const target = event.target as HTMLElement;
		const $target = $(target);

		if ($target.data.type === 'button' && $target.data.value) {
			const value = JSON.parse($target.data.value);

			this.$emit('toolbar:applyStyle', value);
		}
	}
}
