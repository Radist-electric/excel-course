import {IProps} from './types';
import {$, Dom} from 'core/Dom';
import {Emitter} from 'core/Emitter';
import {StoreSubscriber} from 'core/StoreSubscriber';
import {Action, State, Store} from 'redux/types';
import {ComponentInstanceType, ComponentsType} from 'types';

export class Excel {
	$el: Dom;
	Components: ComponentsType; // массив классов компонентов
	components: ComponentInstanceType; // массив экземпляров классов компонентов
	emitter: Emitter;
	store: Store<State, Action>;
	subscriber: StoreSubscriber;

	constructor (props: IProps) {
		const {options, selector} = props;

		this.$el = $(selector);
		this.Components = options.components || [];
		this.components = [];
		this.emitter = new Emitter();
		this.store = options.store;
		this.subscriber = new StoreSubscriber(this.store);
	}

	getRoot (): Dom {
		const $root = $.create('div', 'excel');
		const componentOptions = {
			emitter: this.emitter,
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

	render (): void {
		if (this.$el) {
			this.$el.append(this.getRoot());
			this.subscriber.subscribeComponents(this.components);
			this.components.forEach(component => component.init());
		}
	}

	destroy (): void {
		this.subscriber.unsubscribeFromStore();
		this.components.forEach(component => component.destroy());
	}
}
