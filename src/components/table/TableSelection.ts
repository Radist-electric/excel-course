import {Dom} from 'core/Dom';

export class TableSelection {
	current: Dom | null;
	group: Dom[];

	static className = 'selected';

	constructor () {
		this.group = [];
		this.current = null;
	}

	/**
	 * Выбирает ячейку
	 * @param {Dom} $el - DOM элемент ячейки
	 * @returns {void}
	 */
	select ($el: Dom): void {
		this.unselectGroup();
		this.group.push($el);
		this.current = $el;
		$el.addClass(TableSelection.className);
	}

	/**
	 * Выбирает группу ячеек
	 * @param {Dom[]} $group - DOM элементы ячеек
	 * @returns {void}
	 */
	selectGroup ($group: Dom[] = []): void {
		this.unselectGroup();
		this.group = $group;
		this.group.forEach($el => $el.addClass(TableSelection.className));
	}

	/**
	 * Отменяет выбор группы ячеек
	 * @returns {void}
	 */
	unselectGroup (): void {
		this.group.forEach($el => $el.removeClass(TableSelection.className));
		this.group = [];
	}

	/**
	 * Возвращает массив идентификаторов выбранных ячеек
	 * @returns {string[]} массив идентификаторов выбранных ячеек
	 */
	selectedIds (): string[] {
		return this.group.map($el => $el.id());
	}

	/**
	 * Применяет стиль к выбранным ячейкам
	 * @param {Record<string, number | string | null>} style - стиль
	 * @returns {void}
	 */
	applyStyle (style: Record<string, number | string | null>): void {
		this.group.forEach($el => $el.css(style));
	}
}
