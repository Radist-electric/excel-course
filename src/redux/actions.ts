import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE, UPDATE_LAST_OPENED} from 'redux/actionTypes';
import {Action} from 'redux/types';

/**
 * Action Creators
 */

/**
 * Создаёт действие для изменения текста
 * @param {any} data - данные действия
 * @returns {Action} действие
 */
const changeText = (data: any): Action => ({
	data,
	type: CHANGE_TEXT
});

/**
 * Создаёт действие для изменения размера таблицы
 * @param {any} data - данные действия
 * @returns {Action} действие
 */
const tableResize = (data: any): Action => ({
	data,
	type: TABLE_RESIZE
});

/**
 * Создаёт действие для изменения стилей
 * @param {any} data - данные действия
 * @returns {Action} действие
 */
const changeStyles = (data: any): Action => ({
	data,
	type: CHANGE_STYLES
});

/**
 * Создаёт действие для изменения заголовка
 * @param {any} data - данные действия
 * @returns {Action} действие
 */
const changeTitle = (data: any): Action => ({
	data,
	type: CHANGE_TITLE
});

/**
 * Создаёт действие для применения стилей
 * @param {any} data - данные действия
 * @returns {Action} действие
 */
const applyStyle = (data: any): Action => ({
	data,
	type: APPLY_STYLE
});

/**
 * Создаёт действие для обновления времени последнего открытия
 * @returns {Action} действие
 */
const updateLastOpened = (): Action => ({
	data: Date.now(),
	type: UPDATE_LAST_OPENED
});

export {
	applyStyle,
	changeText,
	changeStyles,
	changeTitle,
	tableResize,
	updateLastOpened
};
