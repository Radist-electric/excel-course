import {Emitter} from 'core/Emitter';
import {Action, State, Store} from 'redux/types';
import {ListenerType} from 'types';

export type OptionsType = {
	emitter: Emitter,
	listeners?: ListenerType[],
	name?: string,
	store: Store<State, Action>,
	subscribe?: string[]
};
