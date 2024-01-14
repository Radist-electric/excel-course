import {IProps} from './types';

export class Excel {
	$el: HTMLElement | null;
	components: any[];

	constructor(props: IProps) {
		const {selector, options} = props;

		this.$el = document.querySelector(selector);
		this.components = options.components || [];
	}

	render() {
		console.log('render', this.$el);
	}
}

