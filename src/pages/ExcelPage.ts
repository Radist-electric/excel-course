import {Excel} from 'components/excel/Excel';
import {CreateStore as Store} from 'core/createStore';
import {Page} from 'core/Page';
import {APP_NAME, COMPONENTS} from 'data/constants';
import {initialState} from 'redux/init';
import {rootReducer} from 'redux/rootReducer';
import {debounce, storage} from 'utils/common';

export class ExcelPage extends Page {
	excel!: Excel;

	getRoot () {
		const store = new Store(rootReducer, initialState);

		const stateListener = debounce(state => {
			console.log('App State: ', state);
			storage(APP_NAME, state);
		}, 300);

		store.subscribe(stateListener);

		this.excel = new Excel({
			options: {
				components: COMPONENTS,
				store
			},
			selector: '#app'
		});

		return this.excel.getRoot();
	}

	afterRender () {
		console.log('afterRender');
		this.excel.init();
	}

	destroy () {
		this.excel.destroy();
	}
}
