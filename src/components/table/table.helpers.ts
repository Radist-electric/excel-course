import {Dom} from 'core/Dom';
import {TableCellId} from 'types';
import {getRange} from 'utils/common';

/**
 * Проверяет, можно ли выполнять изменение размера ячейки
 * @param {MouseEvent} event - событие мыши
 * @returns {boolean} разрешение, можно ли выполнять изменение размера ячейки
 */
export const shouldResize = (event: MouseEvent): boolean => {
	const target = event.target as HTMLDivElement;
	return Boolean(target.dataset.resize);
};

/**
 * Проверяет, является ли элемент ячейкой таблицы
 * @param {MouseEvent} event - событие мыши
 * @returns {boolean} элемент является ячейкой таблицы
 */
export const isCell = (event: MouseEvent): boolean => {
	const target = event.target as HTMLDivElement;
	return target.dataset.type === 'cell';
};

/**
 * Возвращает массив идентификаторов ячеек в диапазоне от текущей до выбранной ячейки
 * @param {Dom} $target - выбранная ячейка, т.е. та, по которой кликнули
 * @param { Dom | null} $current - текущая ячейка (выбранная ранее)
 * @returns {string[]} массив идентификаторов ячеек в диапазоне от текущей до выбранной ячейки
 */
export const getCellMatrix = ($target: Dom, $current: Dom | null): string[] => {
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
};

/**
 * Возвращает следующий селектор при выборе ячейки с клавиатуры
 * @param {string} key - код нажатой клавиши
 * @param {TableCellId} id - идентификатор текущей ячейки
 * @returns {string} следующий селектор при выборе ячейки с клавиатуры
 */
export const nextSelector = (key: string, id: TableCellId): string => {
	const MIN_VALUE = 0;
	let newCol = id.col;
	let newRow = id.row;

	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			newRow++;
			break;
		case 'Tab':
		case 'ArrowRight':
			newCol++;
			break;
		case 'ArrowLeft':
			newCol = newCol - 1 < MIN_VALUE ? MIN_VALUE : newCol - 1;
			break;
		case 'ArrowUp':
			newRow = newRow - 1 < MIN_VALUE ? MIN_VALUE : newRow - 1;
			break;
	}

	return `[data-id="${newRow}:${newCol}"]`;
};
