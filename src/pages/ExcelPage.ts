import {Excel} from 'components/excel/Excel';
import {Dom} from 'core/Dom';
import {Page} from 'core/Page';
import {CreateStore as Store} from 'core/store/createStore';
import {COMPONENTS} from 'data/constants';
import {normalizeInitialState} from 'redux/init';
import {rootReducer} from 'redux/rootReducer';
import {debounce, getStorageName, storage} from 'utils/common';

export class ExcelPage extends Page {
	excel!: Excel;

	/**
	 * Возвращает корневой элемент страницы
	 * @returns {Dom} корневой элемент страницы
	 */
	getRoot (): Dom {
		const params = this.params ? this.params : Date.now().toString();
		const state = storage(getStorageName(params));
		const initialState = normalizeInitialState(state);
		const store = new Store(rootReducer, initialState);

		const stateListener = debounce(state => {
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

	/**
	 * Вызывается после рендера страницы
	 * @returns {void}
	 */
	afterRender (): void {
		this.excel.init();
	}

	/**
	 * Вызывается перед уничтожением страницы
	 * @returns {void}
	 */
	destroy (): void {
		this.excel.destroy();
	}
}
