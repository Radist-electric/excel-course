import {DEFAULT_STYLES, DEFAULT_TITLE} from 'data/constants';
import {State} from 'redux/types';
import {clone} from 'utils/common';

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

const normalize = (state: State): State => ({
	...state,
	currentStyles: DEFAULT_STYLES,
	currentText: ''
});

export function normalizeInitialState (state: State | null): State {
	return state ? normalize(state) : clone(defaultState);
}
