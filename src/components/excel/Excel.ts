import {$, Dom} from 'core/Dom';
import {ComponentInstanceType, ComponentsType} from 'types';
import {IProps} from './types';

export class Excel {
	$el: Dom;
	Components: ComponentsType; // массив классов компонентов
	components: ComponentInstanceType; // массив экземпляров классов компонентов

	constructor(props: IProps) {
		const {selector, options} = props;

		this.$el = $(selector);
		this.Components = options.components || [];
		this.components = [];
	}

	getRoot(): Dom {
		const $root = $.create('div', 'excel');

		this.components = this.Components.map(Component => {
			const $el = $.create('div', Component.className);
			const component = new Component($el);

			$el.html(component.toHTML());
			$root.append($el);

			return component;
		});

		return $root;
	}

	render(): void {
		if (this.$el) {
			this.$el.append(this.getRoot());
			this.components.forEach(component => component.init());
		}
	}
}

