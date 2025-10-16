import {$, Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {ActiveRoute} from 'core/routes/ActiveRoute';
import {OptionsType} from 'core/types';
import {DEFAULT_TITLE} from 'data/constants';
import {changeTitle} from 'redux/actions';
import {debounce} from 'utils/common';

export class Header extends ExcelComponent {
	static classNames = 'excel__header';

	constructor ($root: Dom, options: OptionsType) {
		super(
			$root,
			{
				listeners: ['input', 'click'],
				name: 'Header',
				...options
			}
		);
	}

	/**
	 * Подготавливает компонент
	 * @returns {void}
	 */
	prepare (): void {
		this.onInput = debounce(this.onInput.bind(this), 300);
		this.onClick = this.onClick.bind(this);
	}

	/**
	 * Возвращает HTML разметку компонента
	 * @returns {string} HTML разметка компонента
	 */
	toHTML (): string {
		const title = this.store.getState().title || DEFAULT_TITLE;
		return `
			<input type="text" class="input" value="${title}" />

			<div>

				<div class="button" data-button="remove">
					<i class="material-icons">delete</i>
				</div>

				<div class="button" data-button="exit">
					<i class="material-icons">exit_to_app</i>
				</div>

			</div>
		`;
	}

	/**
	 * Обрабатывает печать в поле ввода компонента
	 * @param {Event} event - событие ввода
	 * @returns {void}
	 */
	onInput (event: Event): void {
		const target = event.target as HTMLInputElement;
		const $target = $(target);

		this.$dispatch(changeTitle($target.text()));
	}

	/**
	 * Обрабатывает клик в компоненте
	 * @param {Event} event - событие клика
	 * @returns {void}
	 */
	onClick (event: Event): void {
		const target = event.target as HTMLElement;
		const $target = $(target);

		if ($target.closest('[data-button="remove"]')) {
			this.removeTable();
		}

		if ($target.closest('[data-button="exit"]')) {
			this.exitToDashboard();
		}
	}

	/**
	 * Удаляет таблицу
	 * @returns {void}
	 */
	removeTable (): void {
		const params = this.params;

		if (params) {
			const decision = confirm('Вы действительно хотите удалить эту таблицу?');

			if (decision) {
				localStorage.removeItem('excel:' + ActiveRoute.param);
				this.exitToDashboard();
			}
		}
	}

	/**
	 * Выходит на главную страницу
	 * @returns {void}
	 */
	exitToDashboard (): void {
		ActiveRoute.navigate('');
	}
}
