import {Formula} from 'components/formula/Formula';
import {Header} from 'components/header/Header';
import {Table} from 'components/table/Table';
import {Toolbar} from 'components/toolbar/Toolbar';
import {Dom} from 'core/Dom';
import {LISTENERS} from 'data/constants';

export type ComponentType = typeof Formula | typeof Header | typeof Table | typeof Toolbar;
export type ComponentsType = ComponentType[];
export type ComponentInstanceType = InstanceType<ComponentType>[];

export type ListenerType = typeof LISTENERS[number];
export type MethodNameType = `on${Capitalize<ListenerType>}`;
export type DebounceThrottleFunction = (...args: any[]) => void;
export type TableCellId = {
	col: number,
	row: number
};
export type VoidFunc = () => void;
export type VoidFuncWithArgs = (...args: any) => void;

export type RouteType = {
	component: any,
	path: string
};

export type RoutesType = Record<string, any>;

export type PageType = {
	afterRender: () => void,
	destroy: () => void,
	getRoot: () => Dom,
	render: () => void
};
