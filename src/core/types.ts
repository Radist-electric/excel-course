import {Emitter} from 'core/Emitter';
import {ListenerType} from 'types';

export type OptionsType = {
	emitter: Emitter,
	listeners?: ListenerType[],
	name?: string
};
