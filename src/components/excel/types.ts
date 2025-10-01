import {Action, State, Store} from 'redux/types';
import {ComponentsType} from 'types';

export type ExcelOptions = {
	components: ComponentsType,
	store: Store<State, Action>
};

export interface IProps {
	options: ExcelOptions,
	selector: string
}
