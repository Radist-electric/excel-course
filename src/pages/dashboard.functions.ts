import {getDDMMYYYYHHMMtime, storage} from 'utils/common';

/**
 * Преобразует ключ из localStorage в HTML
 * @param {string} key - ключ
 * @returns {string} HTML
 */
function toHTML (key: string): string {
	const [, id] = key.split(':');
	const state = storage(key);
	let date = '';

	if (state && state.lastOpenedAt) {
		const lastOpened = new Date(state.lastOpenedAt);

		date = getDDMMYYYYHHMMtime(lastOpened);
	} else {
		const currentTime = new Date();

		date = getDDMMYYYYHHMMtime(currentTime);
	}

	return `
		<li class="db__record">
			<a href="#excel/${id}">${state?.title || state?.tableTitle || 'Без названия'}</a>
			<strong>${date}</strong>
		</li>
	`;
}

/**
 * Возвращает все ключи из localStorage
 * @returns {string[]} все ключи
 */
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

/**
 * Создаёт таблицу записей
 * @returns {string} таблица записей
 */
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
