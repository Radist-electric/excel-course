import {handleResize} from 'components/table/table.handlers';
import {getCellMatrix, isCell, nextSelector, shouldResize} from 'components/table/table.helpers';
import {createTable} from 'components/table/table.template';
import {TableSelection} from 'components/table/TableSelection';
import {$, Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {OptionsType} from 'core/types';
import {DEFAULT_STYLES, TABLE_LISTENERS} from 'data/constants';
import {applyStyle, changeStyles, changeText, tableResize} from 'redux/actions';
import {State} from 'redux/types';
import {parse} from 'utils/common';

export class Table extends ExcelComponent {
	selection!: TableSelection;

	static classNames = 'excel__table excel__table_resize-el-hover-enable';

	constructor ($root: Dom, options: OptionsType) {
		super($root, {
			listeners: TABLE_LISTENERS,
			name: 'Table',
			subscribe: ['colState', 'rowState'],
			...options
		});
	}

	/**
	 * Возвращает HTML разметку таблицы
	 * @returns {string} HTML разметка таблицы
	 */
	toHTML (): string {
		return createTable(20, this.store.getState());
	}

	/**
	 * Подготавливает компонент
	 * @returns {void}
	 */
	prepare (): void {
		this.selection = new TableSelection();
	}

	/**
	 * Инициализирует компонент
	 * @returns {void}
	 */
	init (): void {
		super.init();

		this.selectCell(this.$root.find('[data-id="0:0"]'));

		this.$on('formula:input', (value: string) => {
			const $current = this.selection.current;

			if ($current) {
				$current.attr('data-value', value);
				$current.text(String(parse(value)));
				this.updateTextInStore(value);
			}
		});

		this.$on('formula:done', () => {
			const $current = this.selection.current;

			if ($current) {
				$current.focus();
			}
		});

		this.$on('toolbar:applyStyle', (style: Record<string, number | string | null>) => {
			this.selection.applyStyle(style);
			this.$dispatch(applyStyle({
				ids: this.selection.selectedIds(),
				value: style
			}));
		});
	}

	/**
	 * Обрабатывает изменения состояния
	 * @param {Partial<State>} changes - изменения состояния
	 * @returns {void}
	 */
	storeChanged (changes: Partial<State>): void {
		// Перерисовываем таблицу при изменении размеров колонок или строк
		if (changes.colState || changes.rowState) {
			this.$root.html(this.toHTML());

			// Восстанавливаем выбор ячейки после перерисовки
			if (this.selection.current) {
				const currentId = this.selection.current.id();
				const $current = this.$root.find(`[data-id="${currentId}"]`);

				if ($current) {
					this.selection.select($current);
				}
			}
		}
	}

	/**
	 * Выбирает ячейку
	 * @param {Dom | null} $cell - DOM элемент ячейки
	 * @returns {void}
	 */
	selectCell ($cell: Dom | null): void {
		if ($cell) {
			this.selection.select($cell);
			this.$emit('table:select', $cell);
			this.updateTextInStore($cell.data.value || '');

			const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));

			this.$dispatch(changeStyles(styles));
		}
	}

	/**
	 * Обрабатывает изменение размера таблицы
	 * @param {MouseEvent} event - событие мыши
	 * @returns {void}
	 */
	async resizeTable (event: MouseEvent): Promise<void> {
		try {
			const data = await handleResize(this.$root, event);

			this.$dispatch(tableResize(data));
		} catch (e) {
			const error = e as Error;

			console.error('Resize error', error.message);
		}
	}

	/**
	 * Обрабатывает нажатие мыши на таблице
	 * @param {MouseEvent} event - событие мыши
	 * @returns {void}
	 */
	onMousedown (event: MouseEvent): void {
		if (shouldResize(event)) {
			this.resizeTable(event);
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
				this.selectCell($(target));
			}
		}
	}

	/**
	 * Обрабатывает клик на таблице
	 * @param {MouseEvent} event - событие мыши
	 * @returns {void}
	 */
	onClick (event: MouseEvent): void {
		if (event.target) {
			const target = event.target as HTMLElement;
			const type = target.dataset.type;

			if (type === 'cell') {
				this.$emit('table:input', $(target));
			}
		}
	}

	/**
	 * Обрабатывает нажатие клавиши на таблице
	 * @param {KeyboardEvent} event - событие нажатия клавиши
	 * @returns {void}
	 */
	onKeydown (event: KeyboardEvent): void {
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

	/**
	 * Обновляет текст в хранилище
	 * @param {Dom | string | undefined} value - значение
	 * @returns {void}
	 */
	updateTextInStore (value: Dom | string | undefined): void {
		if (this.selection.current && typeof value === 'string') {
			this.$dispatch(changeText({
				id: this.selection.current.id(),
				value
			}));
		}
	}

	/**
	 * Обрабатывает ввод в таблице
	 * @param {InputEvent} event - событие ввода
	 * @returns {void}
	 */
	onInput (event: InputEvent): void {
		if (event.target) {
			const $target = $(event.target as HTMLElement);

			this.updateTextInStore($target.text());
		}
	}
}
