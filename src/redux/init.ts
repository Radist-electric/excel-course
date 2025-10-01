import {DEFAULT_STYLES, DEFAULT_TITLE} from 'data/constants';
import {State} from 'redux/types';
import {clone} from 'utils/common';

/**
 * Начальное состояние
 * @returns {State} начальное состояние
 */
export const defaultState: State = {
	colState: {},
	currentStyles: DEFAULT_STYLES,
	currentText: '',
	dataState: {},
	lastOpenedAt: Date.now(),
	rowState: {},
	stylesState: {},
	tableTitle: 'My Table excel',
	title: DEFAULT_TITLE
};

/**
 * Нормализует состояние
 * @param {State} state - состояние
 * @returns {State} нормализованное состояние
 */
const normalize = (state: State): State => ({
	...state,
	currentStyles: DEFAULT_STYLES,
	currentText: ''
});

/**
 * Нормализует начальное состояние
 * @param {State | null} state - состояние
 * @returns {State} нормализованное состояние
 */
export function normalizeInitialState (state: State | null): State {
	return state ? normalize(state) : clone(defaultState);
}
