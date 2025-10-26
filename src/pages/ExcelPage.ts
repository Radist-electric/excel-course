import {Excel} from 'components/excel/Excel';
import {Dom} from 'core/Dom';
import {LocalStorageClient} from 'core/LocalStorageClient';
import {Page} from 'core/page/Page';
import {StateProcessor} from 'core/page/StateProcessor';
import {CreateStore as Store} from 'core/store/createStore';
import {COMPONENTS} from 'data/constants';
import {normalizeInitialState} from 'redux/init';
import {rootReducer} from 'redux/rootReducer';

export class ExcelPage extends Page {
	excel!: Excel;
	processor!: StateProcessor;
	storeSub!: {unsubscribe: () => void};

	constructor (param: any) {
		super(param);

		this.processor = new StateProcessor(
			new LocalStorageClient(this.params)
		);
	}

	/**
	 * Возвращает корневой элемент страницы
	 * @returns {Dom} корневой элемент страницы
	 */
	async getRoot (): Promise<Dom> {
		const state = await this.processor.get();
		const initialState = normalizeInitialState(state);
		const store = new Store(rootReducer, initialState);

		this.storeSub = store.subscribe(this.processor.debouncedListen);

		this.excel = new Excel({
			options: {
				components: COMPONENTS,
				params: this.params,
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
		this.storeSub.unsubscribe();
	}
}
