import {Dom} from 'core/Dom';

export class TableSelection {
	group: Dom[];

	static className = 'selected';

	constructor () {
		this.group = [];
	}

	select ($el: Dom) {
		this.unselectGroup();
		this.group.push($el);
		$el.addClass(TableSelection.className);
	}

	selectGroup () {
		this.group.forEach($el => $el.addClass(TableSelection.className));
	}

	unselectGroup () {
		this.group.forEach($el => $el.removeClass(TableSelection.className));
		this.group = [];
	}
}
