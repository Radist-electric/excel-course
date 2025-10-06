import {storage} from 'utils/common';

function toHTML (key: string): string {
	const [, id] = key.split(':');
	const state = storage(key);
	let date = '';

	date = new Date(+id).toLocaleDateString();

	return `
		<li class="db__record">
			<a href="#excel/${id}">${state.title || state.tableTitle}</a>
			<strong>${date}</strong>
		</li>
	`;
}

function getAllKeys (): string[] {
	const keys: string[] = [];

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);

		if (!key?.includes('excel')) {
			continue;
		}

		keys.push(key);
	}

	return keys;
}

export function createRecordsTable (): string {
	const keys = getAllKeys();

	if (!keys.length) {
		return `<p>Вы пока не создали ни одной таблицы</p>`;
	}

	return `
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия</span>
		</div>

		<ul class="db__list">
			${keys.map(toHTML).join('')}
		</ul>
	`;
}
