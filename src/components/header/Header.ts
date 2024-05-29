import {Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {OptionsType} from 'core/types';

export class Header extends ExcelComponent {
	static classNames = 'excel__header';

	constructor ($root: Dom, options: OptionsType) {
		super(
			$root,
			{
				name: 'Header',
				...options
			}
		);
	}

	toHTML () {
		return `
			<input type="text" class="input" value="Новая таблица" />

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
}
