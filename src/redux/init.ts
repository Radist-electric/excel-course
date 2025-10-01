import {APP_NAME, DEFAULT_STYLES, DEFAULT_TITLE} from 'data/constants';
import {State} from 'redux/types';
import {storage} from 'utils/common';

export const defaultState: State = {
	colState: {},
	currentStyles: DEFAULT_STYLES,
	currentText: '',
	dataState: {},
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

export const initialState: State = storage(APP_NAME) ? normalize(storage(APP_NAME)) : defaultState;
