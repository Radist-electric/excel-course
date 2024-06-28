import {$, Dom} from 'core/Dom';
import {ComponentInstanceType, ComponentsType} from 'types';
import {Emitter} from 'core/Emitter';
import {IProps} from './types';

export class Excel {
	$el: Dom;
	Components: ComponentsType; // массив классов компонентов
	components: ComponentInstanceType; // массив экземпляров классов компонентов
	emitter: Emitter;

	constructor (props: IProps) {
		const {selector, options} = props;

		this.$el = $(selector);
		this.Components = options.components || [];
		this.components = [];
		this.emitter = new Emitter();
	}

	getRoot (): Dom {
		const $root = $.create('div', 'excel');
		const componentOptions = {
			emitter: this.emitter
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
			this.components.forEach(component => component.init());
		}
	}

	destroy (): void {
		this.components.forEach(component => component.destroy());
	}
}
