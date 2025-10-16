import {CreateColumnParams} from './types';
import {CODES, COL_DEFAULT_WIDTH, DEFAULT_STYLES, ROW_DEFAULT_HEIGHT} from 'data/constants';
import {ColState, RowState, State} from 'redux/types';
import {parse, toInlineStyles} from 'utils/common';

/**
 * Возвращает высоту строки
 * @param {RowState} rowState - состояние строки
 * @param {number} index - индекс строки
 * @returns {string} высота строки
 */
const getHeight = (rowState: RowState, index: number): string => (rowState[index] || ROW_DEFAULT_HEIGHT) + 'px';

/**
 * Возвращает ширину столбца
 * @param {ColState} colState - состояние столбца
 * @param {number} index - индекс столбца
 * @returns {string} ширина столбца
 */
const getWidth = (colState: ColState, index: number): string => (colState[index] || COL_DEFAULT_WIDTH) + 'px';

/**
 * Создаёт параметры ширины столбца
 * @param {State} state - состояние приложения
 * @returns {Function} функция для создания параметров ширины столбца
 */
const mapWidthToColumnParams = (state: State): ((col: string, index: number) => CreateColumnParams) => (col: string, index: number) =>
	({col, index, width: getWidth(state.colState, index)});

/**
 * Преобразует число в букву
 * @param {string} _ - пустая строка
 * @param {number} index - индекс буквы
 * @returns {string} буква
 */
const toChar = (_: string, index: number): string => String.fromCharCode(CODES.A + index);

/**
 * Создаёт столбец
 * @param {CreateColumnParams} params - параметры столбца
 * @returns {string} вёрстка столбца
 */
const createColumn = ({col, index, width}: CreateColumnParams) => `
	<div
		class="column"
		data-type="resizable"
		data-col="${index}"
		style="width: ${width}"
	>
		${col}
		<div class="col-resize" data-resize="col"></div>
	</div>
`;

/**
 * Создаёт ячейку
 * @param {State} state - состояние приложения
 * @param {number} row - индекс строки
 * @returns {Function} функция для создания ячейки
 */
const createCell = (state: State, row: number): ((_: string, col: number) => string) => (_: string, col: number) => {
	const width = getWidth(state.colState, col);
	const id = `${row}:${col}`;
	const data = (state.dataState && state.dataState[id]) || '';
	const cellStyles = state.stylesState && state.stylesState[id] ? state.stylesState[id] : {};
	const styles = toInlineStyles({
		...DEFAULT_STYLES,
		...cellStyles
	});

	return `
		<div
			class="cell"
			contenteditable
			data-type="cell"
			data-col="${col}"
			data-id="${id}"
			data-value="${data || ''}"
			style="${styles}; width: ${width}"
		>${parse(data) || ''}</div>
	`;
};

/**
 * Создаёт строку
 * @param {number} index - индекс строки
 * @param {string} content - содержимое строки
 * @param {RowState} rowState - состояние строки
 * @returns {string} вёрстка строки
 */
const createRow = (index: number, content: string, rowState: RowState): string => {
	const height = getHeight(rowState, index);
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';

	return `
		<div class="row" ${index ? 'data-type="resizable"' : ''} data-row="${index}" style="height: ${height}">
			<div class="row-info">
				${index === 0 ? '' : index}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
};

/**
 * Создаёт таблицу
 * @param {number} rowsCount - количество строк
 * @param {State} state - состояние приложения
 * @returns {string} - вёрстка таблицы в строковом формате
 */
export const createTable = (rowsCount: number, state: State): string => {
	/**
	 * Количество столбцов равно "Все буквы английского алфавита" + 1 для колонки с порядковыми номерами
	 */
	const colsCount = CODES.Z - CODES.A + 1;
	const colsEmptyArray = new Array(colsCount).fill('');
	const rows = [];

	/**
	 * Колонки нулевой строки, где указана нумерация колонок
	 */
	const cols = colsEmptyArray
		.map(toChar)
		.map(mapWidthToColumnParams(state))
		.map(createColumn)
		.join('');

	/**
	 * Нулевая строка с нумерацией колонок
	 */
	rows.push(createRow(0, cols, state.rowState));

	/**
	 * Основные строки
	 */
	for (let row = 0; row < rowsCount; row++) {
		const cells = colsEmptyArray
			.map(createCell(state, row))
			.join('');

		rows.push(createRow(row + 1, cells, state.rowState));
	}

	return [...rows].join('');
};
