import {Formula} from 'components/formula/Formula';
import {Header} from 'components/header/Header';
import {Table} from 'components/table/Table';
import {Toolbar} from 'components/toolbar/Toolbar';

export const COMPONENTS = [Header, Toolbar, Formula, Table];

export const FORMULA_LISTENERS = ['input', 'click'];
export const HEADER_LISTENERS = ['input'];

export const LISTENERS = [...new Set([
	...FORMULA_LISTENERS,
	...HEADER_LISTENERS
])] as const;

export const CODES = {
	A: 65,
	Z: 90
};
