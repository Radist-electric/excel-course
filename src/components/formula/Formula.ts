import {Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {FORMULA_LISTENERS} from 'data/constants';
import {OptionsType} from 'core/types';

export class Formula extends ExcelComponent {
	static classNames = 'excel__formula';

	constructor ($root: Dom, options: OptionsType) {
		super($root,
			{
				listeners: FORMULA_LISTENERS,
				name: 'Formula',
				...options
			});
	}

	toHTML () {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`;
	}

	onInput (event: Event) {
		const textContent: string | null = (event.target as HTMLElement).textContent;

		if (textContent) {
			const text = textContent.trim();

			this.emitter.emit('Formula:text', text);
			console.log('Formula: onInput', text);
		}
	}

	onClick () {
		console.log('Formula: mouse click');
	}
}
