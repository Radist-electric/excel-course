import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'scss/index.scss';
import {COMPONENTS} from 'data/constants';
import {createStore} from 'core/createStore';
import {Excel} from 'components/excel/Excel';
import {rootReducer} from 'redux/rootReducer';

const store = createStore(rootReducer, {});

const excel = new Excel({
	options: {
		components: COMPONENTS
	},
	selector: '#app',
	store
});

excel.render();
