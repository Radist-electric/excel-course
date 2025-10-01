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
				listeners: ['input'],
				name: 'Header',
				...options
			}
		);
	}

	prepare () {
		this.onInput = debounce(this.onInput.bind(this), 300);
	}

	toHTML () {
		const title = this.store.getState().title || DEFAULT_TITLE;
		return `
			<input type="text" class="input" value="${title}" />

			<div>

				<div class="button">
					<i class="material-icons">delete</i>
				</div>

				<div class="button">
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
}
