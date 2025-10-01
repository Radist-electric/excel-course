import {Dom} from 'core/Dom';

export class TableSelection {
	current: Dom | null;
	group: Dom[];

	static className = 'selected';

	constructor () {
		this.group = [];
		this.current = null;
	}

	select ($el: Dom) {
		this.unselectGroup();
		this.group.push($el);
		this.current = $el;
		$el.addClass(TableSelection.className);
	}

	selectGroup ($group: Dom[] = []) {
		this.unselectGroup();
		this.group = $group;
		this.group.forEach($el => $el.addClass(TableSelection.className));
	}

	unselectGroup () {
		this.group.forEach($el => $el.removeClass(TableSelection.className));
		this.group = [];
	}

	get selectedIds () {
		return this.group.map($el => $el.id());
	}

	applyStyle (style: Record<string, number | string | null>) {
		this.group.forEach($el => $el.css(style));
	}
}
