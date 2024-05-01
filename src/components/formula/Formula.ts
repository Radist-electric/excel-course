import {Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {FORMULA_LISTENERS} from 'data/constants';

export class Formula extends ExcelComponent {
	static classNames = 'excel__formula';

	constructor($root: Dom) {
		super($root, {
			listeners: FORMULA_LISTENERS,
			name: 'Formula'
		});
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`;
	}

	onInput(event: Event) {
		const textContent: string | null = (event.target as HTMLElement).textContent;

		if (textContent) {
			console.log('Formula: onInput', textContent.trim());
		}
	}

	onClick() {
		console.log('Formula: mouse click');
	}
}
