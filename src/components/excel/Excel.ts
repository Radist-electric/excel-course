import {ExcelOptions, IProps} from './types';
import {$, Dom} from 'core/Dom';
import {Emitter} from 'core/Emitter';
import {StoreSubscriber} from 'core/StoreSubscriber';
import {updateLastOpened} from 'redux/actions';
import {Action, State, Store} from 'redux/types';
import {ComponentInstanceType, ComponentsType} from 'types';
import {isProdMode, preventDefault} from 'utils/common';

export class Excel {
	/**
	 * DOM элемент
	 */
	$el: Dom;
	/**
	 * Массив классов компонентов
	 */
	Components: ComponentsType;
	/**
	 * Массив экземпляров классов компонентов
	 */
	components: ComponentInstanceType;
	/**
	 * Эмиттер
	 */
	emitter: Emitter;
	/**
	 * Опции
	 */
	options: ExcelOptions;
	/**
	 * Хранилище
	 */
	store: Store<State, Action>;
	/**
	 * Подписчик на хранилище
	 */
	subscriber: StoreSubscriber;

	constructor (props: IProps) {
		const {options, selector} = props;

		this.$el = $(selector);
		this.Components = options.components || [];
		this.components = [];
		this.emitter = new Emitter();
		this.options = options;
		this.store = options.store;
		this.subscriber = new StoreSubscriber(this.store);
	}

	/**
	 * Получает корневой элемент
	 * @returns {Dom} корневой элемент
	 */
	getRoot (): Dom {
		const $root = $.create('div', 'excel');
		const componentOptions = {
			emitter: this.emitter,
			params: this.options.params,
			store: this.store
		};

		this.components = this.Components.map(Component => {
			const $el = $.create('div', Component.classNames);
			const component = new Component($el, componentOptions);

			$el.html(component.toHTML());
			$root.append($el);

			return component;
		});

		return $root;
	}

	/**
	 * Инициализирует Excel
	 * @returns {void}
	 */
	init (): void {
		if (isProdMode()) {
			document.addEventListener('contextmenu', preventDefault);
		}

		this.store.dispatch(updateLastOpened());
		this.subscriber.subscribeComponents(this.components);
		this.components.forEach(component => component.init());
	}

	/**
	 * Демонтирует Excel
	 * @returns {void}
	 */
	destroy (): void {
		this.subscriber.unsubscribeFromStore();
		this.components.forEach(component => component.destroy());

		if (isProdMode()) {
			document.removeEventListener('contextmenu', preventDefault);
		}
	}
}
