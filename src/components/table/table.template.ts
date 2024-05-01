import {CODES} from 'data/constants';

const toChar = (_: string, index: number) => String.fromCharCode(CODES.A + index);

const toColumn = (col: string) => `<div class="column">${col}</div>`;

const createCell = () => `<div class="cell" contenteditable></div>`;

const createRow = (num: number, content: string) => (
	`
		<div class="row">
			<div class="row-info">${num === 0 ? '' : num}</div>
			<div class="row-data">${content}</div>
		</div>
	`
);

export const createTable = (rowsCount = 20) => {
	const colsCount = CODES.Z - CODES.A + 1;
	const colsEmptyArray = new Array(colsCount).fill('');
	const rows = [];

	const cols = colsEmptyArray
		.map(toChar)
		.map(toColumn)
		.join('');

	rows.push(createRow(0, cols));

	for (let i = 0; i < rowsCount; i++) {
		const cells = colsEmptyArray
			.map(createCell)
			.join('');
		rows.push(createRow(i + 1, cells));
	}

	return rows.join('');
};
