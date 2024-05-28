import {CODES} from 'data/constants';

const toChar = (_: string, index: number) => String.fromCharCode(CODES.A + index);

const toColumn = (col: string, index: number) => `
	<div class="column" data-type="resizable" data-col="${index}">
		${col}
		<div class="col-resize" data-resize="col"></div>
	</div>
`;

const createCell = (_: string, index: number) => `<div class="cell" data-col="${index}" contenteditable></div>`;

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

	for (let i = 0; i < rowsCount; i++) {
		const cells = colsEmptyArray
			.map(createCell)
			.join('');
		rows.push(createRow(i + 1, cells));
	}

	return [...rows].join('');
};
