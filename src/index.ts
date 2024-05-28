import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'scss/index.scss';
import {COMPONENTS} from 'data/constants';
import {Excel} from 'components/excel/Excel';

const excel = new Excel({
	options: {
		components: COMPONENTS
	},
	selector: '#app'
});

excel.render();
