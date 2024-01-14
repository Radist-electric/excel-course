import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'scss/index.scss';
import {COMPONENTS} from 'data/constants';
import {Excel} from 'components/excel/Excel';

const excel = new Excel({
	selector: '#app',
	options: {
		components: COMPONENTS
	}
});

excel.render();
