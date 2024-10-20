import {Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {OptionsType} from 'core/types';

export class Toolbar extends ExcelComponent {
	static classNames = 'excel__toolbar';

	constructor ($root: Dom, options: OptionsType) {
		super($root, {
			listeners: ['click'],
			name: 'Toolbar',
			...options
		});
	}

	toHTML () {
		return `
			<div class="button">
				<i class="material-icons">format_align_left</i>
			</div>

			<div class="button">
				<i class="material-icons">format_align_center</i>
			</div>

			<div class="button">
				<i class="material-icons">format_align_right</i>
			</div>

			<div class="button">
				<i class="material-icons">format_bold</i>
			</div>

			<div class="button">
				<i class="material-icons">format_italic</i>
			</div>

			<div class="button">
				<i class="material-icons">format_underlined</i>
			</div>
		`;
	}

	onClick (event: Event) {
		console.log(event.target);
	}
}
