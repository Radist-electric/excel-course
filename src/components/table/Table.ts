import {createTable} from 'components/table/table.template';
import {Dom} from 'core/Dom';
import {ExcelComponent} from 'core/ExcelComponent';
import {handleMousedown} from './handlers';
import {TABLE_LISTENERS} from 'data/constants';


export class Table extends ExcelComponent {
	static classNames = 'excel__table excel__table_resize-el-hover-enable';

	constructor($root: Dom) {
		super($root, {
			listeners: TABLE_LISTENERS
		});
	}

	toHTML() {
		return createTable(20);
	}

	onMousedown = handleMousedown;
}
