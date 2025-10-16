import {createRecordsTable} from './dashboard.functions';
import {$, Dom} from 'core/Dom';
import {Page} from 'core/Page';

export class DashboardPage extends Page {
	/**
	 * Возвращает корневой элемент страницы
	 * @returns {Dom} корневой элемент страницы
	 */
	getRoot (): Dom {
		const now = Date.now().toString();
		const $root = $.create('div', 'db');

		$root.html(`
			<div class="db__header">
				<h1>Панель управления Excel</h1>
			</div>

			<div class="db__new">
				<div class="db__view">
					<a href="#excel/${now}" class="db__create">
						Новая <br /> Таблица
					</a>
				</div>
			</div>

			<div class="db__table db__view">
				${createRecordsTable()}
			</div>
		`);

		return $root;
	}
}
