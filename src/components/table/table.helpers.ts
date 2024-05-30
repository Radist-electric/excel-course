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
