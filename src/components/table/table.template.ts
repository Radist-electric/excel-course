import {CODES} from 'data/constants';

const toChar = (_: string, index: number) => String.fromCharCode(CODES.A + index);

const toColumn = (col: string, index: number) => `
	<div class="column" data-type="resizable" data-col="${index}">
		${col}
		<div class="col-resize" data-resize="col"></div>
	</div>
`;

function createCell (row: number) {
	return (_: string, col: number) => `
		<div 
			class="cell"
			contenteditable
			data-type="cell"
			data-col="${col}"
			data-id="${row}:${col}"
		></div>
	`;
}

const createRow = (index: number, content: string) => {
	const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
	return `
		<div class="row" ${index ? 'data-type="resizable"' : ''}>
			<div class="row-info">
				${index === 0 ? '' : index}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
};

export const createTable = (rowsCount = 15) => {
	const colsCount = CODES.Z - CODES.A + 1;
	const colsEmptyArray = new Array(colsCount).fill('');
	const rows = [];

	const cols = colsEmptyArray
		.map(toChar)
		.map(toColumn)
		.join('');

	rows.push(createRow(0, cols));

	for (let row = 0; row < rowsCount; row++) {
		const cells = colsEmptyArray
			.map(createCell(row))
			.join('');

		rows.push(createRow(row + 1, cells));
	}

	return [...rows].join('');
};
