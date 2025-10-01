import {$, Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {OptionsType} from 'core/types';
import {FORMULA_LISTENERS} from 'data/constants';
import {State} from 'redux/types';

export class Formula extends ExcelComponent {
	static classNames = 'excel__formula';

	$formula: Dom | null;

	constructor ($root: Dom, options: OptionsType) {
		super(
			$root,
			{
				listeners: FORMULA_LISTENERS,
				name: 'Formula',
				subscribe: ['currentText'],
				...options
			}
		);

		this.$formula = null;
	}

	toHTML () {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false" data-id="formula"></div>
		`;
	}

	init () {
		super.init();

		this.$formula = this.$root.find('[data-id="formula"]');

		this.$on('table:select', ($cell: Dom) => {
			if (this.$formula) {
				this.$formula.text($cell.data.value || '');
			}
		});
	}

	storeChanged (changes: Partial<State>) {
		if (this.$formula && changes.currentText !== undefined) {
			this.$formula.text(changes.currentText);
		}
	}

	onInput (event: InputEvent) {
		if (event.target) {
			this.$emit('formula:input', $(event.target as HTMLElement).text());
		}
	}

	onClick () {
		console.log('Formula: mouse click');
	}

	onKeydown (event: KeyboardEvent) {
		const keys = ['Enter', 'Tab'];

		if (keys.includes(event.key) && !event.shiftKey) {
			event.preventDefault();
			this.$emit('formula:done');
		}
	}
}
