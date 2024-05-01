import {Formula} from 'components/formula/Formula';
import {Header} from 'components/header/Header';
import {LISTENERS} from 'data/constants';
import {Table} from 'components/table/Table';
import {Toolbar} from 'components/toolbar/Toolbar';

export type ComponentType = typeof Header | typeof Formula | typeof Table | typeof Toolbar;
export type ComponentsType = ComponentType[];
export type ComponentInstanceType = InstanceType<ComponentType>[];

export type ListenerType = typeof LISTENERS[number];
export type MethodNameType = `on${Capitalize<ListenerType>}`;
