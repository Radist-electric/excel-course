import {ComponentsType} from 'types';

export type ExcelOptions = {
	components: ComponentsType
};

export interface IProps {
	selector: string,
	options: ExcelOptions
}
