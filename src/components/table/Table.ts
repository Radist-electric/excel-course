import {$, Dom} from 'core/Dom';
import {createTable} from 'components/table/table.template';
import {ExcelComponent} from 'core/ExcelComponent';
import {getCellMatrix, isCell, nextSelector, shouldResize} from 'components/table/table.helpers';
import {handleResize} from 'components/table/table.handlers';
import {OptionsType} from 'core/types';
import {TABLE_LISTENERS} from 'data/constants';
import {TableSelection} from 'components/table/TableSelection';

export class Table extends ExcelComponent {
	selection!: TableSelection;

	static classNames = 'excel__table excel__table_resize-el-hover-enable';

	constructor ($root: Dom, options: OptionsType) {
		super($root, {
			listeners: TABLE_LISTENERS,
			name: 'Table',
			...options
		});
	}

	toHTML () {
		return createTable(20);
	}

	prepare () {
		this.selection = new TableSelection();
	}

	init () {
		super.init();

		this.selectCell(this.$root.find('[data-id="0:0"]'));

		this.$on('formula:input', (text: string) => {
			const $current = this.selection.current;

			if ($current) {
				$current.text(text);
			}
		});

		this.$on('formula:done', () => {
			const $current = this.selection.current;

			if ($current) {
				$current.focus();
			}
		});
	}

	selectCell ($cell: Dom | null) {
		if ($cell) {
			this.selection.select($cell);
			this.$emit('table:select', $cell);
		}
	}

	onMousedown (event: MouseEvent) {
		if (shouldResize(event)) {
			handleResize(this.$root, event);
		}

		if (isCell(event)) {
			const target = event.target as HTMLElement;

			if (event.shiftKey) {
				const $cells = getCellMatrix($(target), this.selection.current)
					.reduce((acc: Dom[], id: string) => {
						const $cell = this.$root.find(`[data-id="${id}"]`);

						if ($cell) {
							acc.push($cell);
						}

						return acc;
					}, []);

				this.selection.selectGroup($cells);
			} else {
				this.selection.select($(target));
			}
		}
	}

	onClick (event: MouseEvent) {
		if (event.target) {
			this.$emit('table:input', $(event.target as HTMLElement));
		}
	}

	onKeydown (event: KeyboardEvent) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowDown',
			'ArrowUp'
		];

		const {key} = event;

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();

			if (this.selection.current) {
				const id = this.selection.current.idAsObject();
				const $next = this.$root.find(nextSelector(key, id));

				this.selectCell($next);
				$next?.focus();
			}
		}
	}

	onInput (event: InputEvent) {
		if (event.target) {
			this.$emit('table:input', $(event.target as HTMLElement));
		}
	}
}
