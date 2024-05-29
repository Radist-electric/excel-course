import {Formula} from 'components/formula/Formula';
import {Header} from 'components/header/Header';
import {Table} from 'components/table/Table';
import {Toolbar} from 'components/toolbar/Toolbar';

export const COMPONENTS = [Header, Toolbar, Formula, Table];

export const FORMULA_LISTENERS = ['click', 'input', 'keydown'];
export const HEADER_LISTENERS = ['input'];
export const TABLE_LISTENERS = ['click', 'input', 'keydown', 'mousedown'];

export const LISTENERS = [...new Set([
	...FORMULA_LISTENERS,
	...HEADER_LISTENERS,
	...TABLE_LISTENERS
])] as const;

export const CODES = {
	A: 65,
	Z: 90
};

export const COL_MIN_WIDTH = 40;
export const ROW_MIN_HEIGHT = 24;
