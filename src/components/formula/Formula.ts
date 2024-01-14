import {Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {FORMULA_LISTENERS} from 'data/constants';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

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
		console.log(this.$root);
		if (event.target) {
			console.log('Formula: onInput', event.target.textContent.trim());
		}
	}

	onClick() {
		console.log('Formula: mouse click');
	}
}
