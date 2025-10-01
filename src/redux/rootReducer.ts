import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from './actionTypes';
import {Action, State} from 'redux/types';

export function rootReducer (state: State, action: Action): State {
	const {data, type} = action;

	console.log('rootReducer data', data);

	switch (type) {
		case CHANGE_TEXT: {
			return {
				...state,
				currentText: data.value,
				dataState: {
					...state.dataState,
					[data.id]: data.value
				}
			};
		}
		case TABLE_RESIZE: {
			if (data.type === 'col') {
				return {
					...state,
					colState: {
						...state.colState,
						[data.id]: data.value
					}
				};
			}

			if (data.type === 'row') {
				return {
					...state,
					rowState: {
						...state.rowState,
						[data.id]: data.value
					}
				};
			}

			return state;
		}
		case CHANGE_STYLES: {
			return {
				...state,
				currentStyles: data
			};
		}
		case CHANGE_TITLE: {
			return {
				...state,
				title: data
			};
		}
		case APPLY_STYLE: {
			const field = 'stylesState';
			const val = state[field] || {};

			data.ids.forEach((id: string) => {
				val[id] = {...val[id], ...data.value};
			});
			return {
				...state,
				currentStyles: {...state.currentStyles, ...data.value},
				[field]: val
			};
		}
		default: return state;
	}
}
