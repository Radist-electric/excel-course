import {Excel} from 'components/excel/Excel';
import {CreateStore as Store} from 'core/createStore';
import {Page} from 'core/Page';
import {COMPONENTS} from 'data/constants';
import {normalizeInitialState} from 'redux/init';
import {rootReducer} from 'redux/rootReducer';
import {debounce, getStorageName, storage} from 'utils/common';

export class ExcelPage extends Page {
	excel!: Excel;

	getRoot () {
		const params = this.params ? this.params : Date.now().toString();
		const state = storage(getStorageName(params));
		const initialState = normalizeInitialState(state);
		const store = new Store(rootReducer, initialState);

		const stateListener = debounce(state => {
			console.log('App State: ', state);
			storage(getStorageName(params), state);
		}, 300);

		store.subscribe(stateListener);

		this.excel = new Excel({
			options: {
				components: COMPONENTS,
				params,
				store
			},
			selector: '#app'
		});

		return this.excel.getRoot();
	}

	afterRender () {
		this.excel.init();
	}

	destroy () {
		this.excel.destroy();
	}
}
