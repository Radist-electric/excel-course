import {ActiveRoute} from './ActiveRoute';

describe('Класс ActiveRoute', () => {
	let originalHash: string;

	beforeEach(() => {
		originalHash = window.location.hash;
		window.location.hash = '';
	});

	afterEach(() => {
		window.location.hash = originalHash;
	});

	describe('Метод path', () => {
		it('возвращает путь без символа #', () => {
			window.location.hash = '#dashboard';

			expect(ActiveRoute.path).toBe('dashboard');
		});

		it('возвращает пустую строку для пустого hash', () => {
			window.location.hash = '';

			expect(ActiveRoute.path).toBe('');
		});

		it('возвращает путь с параметрами', () => {
			window.location.hash = '#excel/123';

			expect(ActiveRoute.path).toBe('excel/123');
		});

		it('возвращает путь без символа # для сложного пути', () => {
			window.location.hash = '#some/deep/path/with/params';

			expect(ActiveRoute.path).toBe('some/deep/path/with/params');
		});
	});

	describe('Метод param', () => {
		it('возвращает параметр из пути', () => {
			window.location.hash = '#excel/123';

			expect(ActiveRoute.param).toBe('123');
		});

		it('возвращает undefined для пути без параметров', () => {
			window.location.hash = '#dashboard';

			expect(ActiveRoute.param).toBe(undefined);
		});

		it('возвращает undefined для пустого пути', () => {
			window.location.hash = '';

			expect(ActiveRoute.param).toBe(undefined);
		});

		it('возвращает первый параметр из сложного пути', () => {
			window.location.hash = '#excel/456/extra/params';

			expect(ActiveRoute.param).toBe('456');
		});

		it('возвращает пустую строку для пути с пустым параметром', () => {
			window.location.hash = '#excel/';

			expect(ActiveRoute.param).toBe('');
		});
	});

	describe('Метод navigate', () => {
		it('устанавливает hash для переданного пути', () => {
			ActiveRoute.navigate('dashboard');

			expect(window.location.hash).toBe('#dashboard');
		});

		it('устанавливает hash с символом # для пути с #', () => {
			ActiveRoute.navigate('#excel/123');

			expect(window.location.hash).toBe('#excel/123');
		});

		it('устанавливает пустой hash для пустой строки', () => {
			ActiveRoute.navigate('');

			expect(window.location.hash).toBe('');
		});

		it('перезаписывает существующий hash', () => {
			window.location.hash = '#old/path';
			ActiveRoute.navigate('new/path');

			expect(window.location.hash).toBe('#new/path');
		});

		it('корректно обрабатывает сложные пути', () => {
			ActiveRoute.navigate('some/deep/path/with/params');

			expect(window.location.hash).toBe('#some/deep/path/with/params');
		});
	});
});
