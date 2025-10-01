import 'scss/index.scss';
import {Excel} from 'components/excel/Excel';
import {CreateStore as Store} from 'core/createStore';
import {APP_NAME, COMPONENTS} from 'data/constants';
import {initialState} from 'redux/init';
import {rootReducer} from 'redux/rootReducer';
import {debounce, storage} from 'utils/common';

const store = new Store(rootReducer, initialState);

const stateListener = debounce(state => {
	console.log('App State: ', state);
	storage(APP_NAME, state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel({
	options: {
		components: COMPONENTS,
		store
	},
	selector: '#app'
});

excel.render();
