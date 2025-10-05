import {$, Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
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

	prepare () {
		this.onInput = debounce(this.onInput.bind(this), 300);
		this.onClick = this.onClick.bind(this);
	}

	toHTML () {
		const title = this.store.getState().title || DEFAULT_TITLE;
		return `
			<input type="text" class="input" value="${title}" />

			<div>

				<div class="button" data-button="delete">
					<i class="material-icons">delete</i>
				</div>

				<div class="button" data-button="exit">
					<i class="material-icons">exit_to_app</i>
				</div>

			</div>
		`;
	}

	onInput (event: Event) {
		const target = event.target as HTMLInputElement;
		const $target = $(target);

		this.$dispatch(changeTitle($target.text()));
	}

	onClick (event: Event) {
		const target = event.target as HTMLElement;
		const $target = $(target);

		if ($target.closest('[data-button="delete"]')) {
			this.deleteTable();
		}

		if ($target.closest('[data-button="exit"]')) {
			this.exitToDashboard();
		}
	}

	deleteTable () {
		const params = this.params;

		if (params) {
			localStorage.removeItem(`excel:${params}`);
		}

		this.exitToDashboard();
	}

	exitToDashboard () {
		window.location.hash = '';
	}
}
