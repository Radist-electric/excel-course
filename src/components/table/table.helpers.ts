import {Dom} from 'core/Dom';
import {getRange} from 'utils/common';

/**
 * Проверяет, можно ли выполнять изменение размера ячейки
 * @param {MouseEvent} event - событие мыши
 * @returns {boolean} разрешение, можно ли выполнять изменение размера ячейки
 */
export function shouldResize (event: MouseEvent): boolean {
	const target = event.target as HTMLDivElement;
	return Boolean(target.dataset.resize);
}

/**
 * Проверяет, является ли элемент ячейкой таблицы
 * @param {MouseEvent} event - событие мыши
 * @returns {boolean} элемент является ячейкой таблицы
 */
export function isCell (event: MouseEvent): boolean {
	const target = event.target as HTMLDivElement;
	return target.dataset.type === 'cell';
}

/**
 * Возвращает массив идентификаторов ячеек в диапазоне от текущей до выбранной ячейки
 * @param {Dom} $target - выбранная ячейка, т.е. та, по которой кликнули
 * @param { Dom | null} $current - текущая ячейка (выбранная ранее)
 * @returns {string[]} массив идентификаторов ячеек в диапазоне от текущей до выбранной ячейки
 */
export function getCellMatrix ($target: Dom, $current: Dom | null): string[] {
	if ($current) {
		const target = $target.idAsObject();
		const current = $current.idAsObject();
		const cols = getRange(current.col, target.col);
		const rows = getRange(current.row, target.row);

		return cols.reduce((acc: string[], col: number) => {
			rows.forEach(row => acc.push(`${row}:${col}`));
			return acc;
		}, []);
	}

	return [];
}
