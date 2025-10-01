import {ToolbarButton} from './types';

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
			active: textDecoration === 'underline',
			icon: 'format_underlined',
			value: {textDecoration: textDecoration === 'underline' ? 'none' : 'underline'}
		}
	];

	return buttons.map(toButton).join('');
};
