import {ToolbarButton} from './types';

/**
 * Проверяет, содержит ли текущий textDecoration указанное значение
 * @param {string} currentTextDecoration - текущий textDecoration
 * @param {string} decoration - проверяемое значение textDecoration
 * @returns {boolean} true, если currentTextDecoration содержит decoration
 */
const hasTextDecoration = (currentTextDecoration: string, decoration: string): boolean =>
	currentTextDecoration.includes(decoration);

/**
 * Добавляет или удаляет значение textDecoration в соответствии с переданным параметром
 * @param {string} textDecoration - текущий textDecoration
 * @param {string} decoration - проверяемое значение textDecoration
 * @returns {string} обновлённый textDecoration
 */
const toggleTextDecoration = (textDecoration: string, decoration: string): string => {
	// Разбиваем textDecoration на массив значений и фильтруем пустые значения и 'none'
	const decorations = textDecoration.split(' ').filter(d => d && d !== 'none');

	if (decorations.includes(decoration)) {
		// Если значение уже было, то удаляем decoration из массива
		const newDecorations = decorations.filter(d => d !== decoration);
		return newDecorations.length > 0 ? newDecorations.join(' ') : 'none';
	} else {
		// Если значения не было, то добавляем decoration в массив
		const newDecorations = [...decorations, decoration];
		return newDecorations.join(' ');
	}
};

/**
 * Создаёт HTML разметку кнопки
 * @param {ToolbarButton} button - кнопка
 * @returns {string} HTML разметка кнопки
 */
const toButton = (button: ToolbarButton): string => {
	const meta = `
		data-type="button"
		data-value='${JSON.stringify(button.value)}'
	`;

	return `
		<div 
			class="button ${button.active ? 'active' : ''}"
			${meta}
		>
			<i 
				class="material-icons"
				${meta}
			>${button.icon}</i>
		</div>
	`;
};

/**
 * Создаёт HTML разметку тулбара с кнопками форматирования
 * @param {Record<string, any>} state - состояние компонента
 * @returns {string} HTML разметка тулбара
 */
export const createToolbar = (state: Record<string, any> = {}): string => {
	const {fontStyle, fontWeight, textAlign, textDecoration} = state;
	const buttons: ToolbarButton[] = [
		{
			active: textAlign === 'left',
			icon: 'format_align_left',
			value: {textAlign: 'left'}
		},
		{
			active: textAlign === 'center',
			icon: 'format_align_center',
			value: {textAlign: 'center'}
		},
		{
			active: textAlign === 'right',
			icon: 'format_align_right',
			value: {textAlign: 'right'}
		},
		{
			active: fontWeight === 'bold',
			icon: 'format_bold',
			value: {fontWeight: fontWeight === 'bold' ? 'normal' : 'bold'}
		},
		{
			active: fontStyle === 'italic',
			icon: 'format_italic',
			value: {fontStyle: fontStyle === 'italic' ? 'normal' : 'italic'}
		},
		{
			active: hasTextDecoration(textDecoration, 'underline'),
			icon: 'format_underlined',
			value: {textDecoration: toggleTextDecoration(textDecoration, 'underline')}
		},
		{
			active: hasTextDecoration(textDecoration, 'line-through'),
			icon: 'strikethrough_s',
			value: {textDecoration: toggleTextDecoration(textDecoration, 'line-through')}
		}
	];

	return buttons.map(toButton).join('');
};
