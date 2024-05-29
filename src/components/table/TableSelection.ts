import {Dom} from 'core/Dom';

export class TableSelection {
	group: Dom[];

	constructor () {
		this.group = [];
	}

	select ($el: Dom) {
		this.unselectGroup();
		this.group.push($el);
		$el.addClass('selected');
	}

	selectGroup () {
		this.group.forEach(el => el.addClass('selected'));
	}

	unselectGroup () {
		this.group.forEach(el => el.removeClass('selected'));
	}
}
