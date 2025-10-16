import {$, Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {OptionsType} from 'core/types';
import {FORMULA_LISTENERS} from 'data/constants';
import {State} from 'redux/types';

export class Formula extends ExcelComponent {
	static classNames = 'excel__formula';

	/**
	 * DOM элемент формулы
	 */
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

	/**
	 * Возвращает HTML разметку формулы
	 * @returns {string} HTML разметка формулы
	 */
	toHTML (): string {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false" data-id="formula"></div>
		`;
	}

	/**
	 * Инициализирует формулу
	 * @returns {void}
	 */
	init (): void {
		super.init();

		this.$formula = this.$root.find('[data-id="formula"]');

		this.$on('table:select', ($cell: Dom) => {
			if (this.$formula) {
				this.$formula.text($cell.data.value || '');
			}
		});
	}

	/**
	 * Обрабатывает изменения состояния.
	 * @param {Partial<State>} changes - изменения
	 * @returns {void}
	 */
	storeChanged (changes: Partial<State>): void {
		if (this.$formula && changes.currentText !== undefined) {
			this.$formula.text(changes.currentText);
		}
	}

	/**
	 * Обрабатывает ввод в формулу
	 * @param {InputEvent} event - событие ввода
	 * @returns {void}
	 */
	onInput (event: InputEvent): void {
		if (event.target) {
			this.$emit('formula:input', $(event.target as HTMLElement).text());
		}
	}

	/**
	 * Обрабатывает клик в формулу
	 * @returns {void}
	 */
	onClick (): void {}

	/**
	 * Обрабатывает нажатие клавиши в формулу
	 * @param {KeyboardEvent} event - событие нажатия клавиши
	 * @returns {void}
	 */
	onKeydown (event: KeyboardEvent): void {
		const keys = ['Enter', 'Tab'];

		if (keys.includes(event.key) && !event.shiftKey) {
			event.preventDefault();
			this.$emit('formula:done');
		}
	}
}
