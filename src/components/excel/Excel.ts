import {ExcelOptions, IProps} from './types';
import {$, Dom} from 'core/Dom';
import {Emitter} from 'core/Emitter';
import {StoreSubscriber} from 'core/StoreSubscriber';
import {updateLastOpened} from 'redux/actions';
import {Action, State, Store} from 'redux/types';
import {ComponentInstanceType, ComponentsType} from 'types';
import {isProdMode, preventDefault} from 'utils/common';

export class Excel {
	$el: Dom;
	Components: ComponentsType; // массив классов компонентов
	components: ComponentInstanceType; // массив экземпляров классов компонентов
	emitter: Emitter;
	options: ExcelOptions;
	store: Store<State, Action>;
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

	init () {
		if (isProdMode()) {
			document.addEventListener('contextmenu', preventDefault);
		}

		this.store.dispatch(updateLastOpened());
		this.subscriber.subscribeComponents(this.components);
		this.components.forEach(component => component.init());
	}

	destroy (): void {
		this.subscriber.unsubscribeFromStore();
		this.components.forEach(component => component.destroy());

		if (isProdMode()) {
			document.removeEventListener('contextmenu', preventDefault);
		}
	}
}
