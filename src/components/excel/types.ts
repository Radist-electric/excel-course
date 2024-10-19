import {Action, State, Store} from 'redux/types';
import {ComponentsType} from 'types';

export type ExcelOptions = {
	components: ComponentsType
};

export interface IProps {
	options: ExcelOptions,
	selector: string,
	store: Store<State, Action>
}
