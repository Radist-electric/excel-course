import {Action, State} from 'redux/types';

export function rootReducer (state: State, action: Action): State {
	console.log('action', action);
	return state;
}
