function toHTML (key: string): string {
	const [, param] = key.split(':');
	const stateString = localStorage.getItem(key);
	let title = 'Без названия';
	let date = '';

	if (stateString) {
		try {
			const state = JSON.parse(stateString);

			title = state.title || state.tableTitle;
			date = new Date(+param).toLocaleDateString();
		} catch (e) {
			console.error('Error parsing state for key:', key, e);
		}
	}

	return `
		<li class="db__record">
			<a href="#excel/${param}">${title}</a>
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
