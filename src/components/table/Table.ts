import {$, Dom} from 'core/Dom';
import {createTable} from 'components/table/table.template';
import {ExcelComponent} from 'core/ExcelComponent';
import {getCellMatrix, isCell, shouldResize} from 'components/table/table.helpers';
import {handleResize} from 'components/table/table.handlers';
import {TABLE_LISTENERS} from 'data/constants';
import {TableSelection} from 'components/table/TableSelection';

export class Table extends ExcelComponent {
	selection!: TableSelection;

	static classNames = 'excel__table excel__table_resize-el-hover-enable';

	constructor ($root: Dom) {
		super($root, {
			listeners: TABLE_LISTENERS
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

		const $cell = this.$root.find('[data-id="0:0"]');

		if ($cell) {
			this.selection.select($cell);
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
}
