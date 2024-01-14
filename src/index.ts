import 'core-js/stable'; // Вместо @babel/polyfill
import 'regenerator-runtime/runtime'; // Вместо @babel/polyfill
import './scss/index.scss';
import {Excel} from 'components/excel/Excel';
import {Formula} from 'components/formula/Formula';
import {Header} from 'components/header/Header';
import {Table} from 'components/table/Table';
import {Toolbar} from 'components/toolbar/Toolbar';

const excel = new Excel({
	selector: '#app',
	options: {
		components: [Formula, Header, Table, Toolbar]
	}
});

excel.render();
