import {Dom} from 'core/Dom';
import {Router} from 'core/routes/Router';
import {PageType, RoutesType} from 'types';

describe('Класс Router', () => {
	let router: Router;
	let mockRoutes: RoutesType;
	let mockPage: PageType;
	let mockDom: Dom;
	let mockSelector: string;

	beforeEach(() => {
		window.location.hash = '';

		mockDom = {
			append: jest.fn(),
			clear: jest.fn()
		} as unknown as Dom;

		jest.spyOn(require('core/Dom'), '$').mockReturnValue(mockDom);

		mockPage = {
			afterRender: jest.fn(),
			destroy: jest.fn(),
			getRoot: jest.fn().mockReturnValue(mockDom),
			render: jest.fn()
		} as unknown as PageType;

		mockRoutes = {
			dashboard: jest.fn().mockReturnValue(mockPage),
			excel: jest.fn().mockReturnValue(mockPage)
		};

		mockSelector = '#app';
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe('Класс Router', () => {
		it('создает экземпляр с переданными параметрами', () => {
			router = new Router(mockSelector, mockRoutes);

			expect(router).toBeInstanceOf(Router);
			expect(router.$placeholder).toBe(mockDom);
			expect(router.routes).toBe(mockRoutes);
			expect(router.page).toBe(mockPage);
		});

		it('выбрасывает ошибку при отсутствии селектора', () => {
			expect(() => {
				new Router('', mockRoutes);
			}).toThrow('Selector is not provided in Router');
		});

		it('инициализирует слушатель hashchange при создании', () => {
			const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

			router = new Router(mockSelector, mockRoutes);

			expect(addEventListenerSpy).toHaveBeenCalledWith('hashchange', expect.any(Function));
		});

		it('вызывает changePageHandler при инициализации', () => {
			const changePageHandlerSpy = jest.spyOn(Router.prototype, 'changePageHandler');

			router = new Router(mockSelector, mockRoutes);

			expect(changePageHandlerSpy).toHaveBeenCalled();
		});
	});

	describe('Метод init', () => {
		beforeEach(() => {
			router = new Router(mockSelector, mockRoutes);
		});

		it('добавляет слушатель hashchange', () => {
			const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

			router.init();

			expect(addEventListenerSpy).toHaveBeenCalledWith('hashchange', expect.any(Function));
		});

		it('вызывает changePageHandler', () => {
			const changePageHandlerSpy = jest.spyOn(router, 'changePageHandler');

			router.init();

			expect(changePageHandlerSpy).toHaveBeenCalled();
		});
	});

	describe('Метод changePageHandler', () => {
		beforeEach(() => {
			router = new Router(mockSelector, mockRoutes);
		});

		it('очищает placeholder', () => {
			router.changePageHandler();

			expect(mockDom.clear).toHaveBeenCalled();
		});

		it('создает excel страницу, если в пути есть "excel"', () => {
			jest.clearAllMocks();

			window.location.hash = '#excel/123';

			router.changePageHandler();

			expect(mockRoutes.excel).toHaveBeenCalledWith('123');
			expect(mockRoutes.dashboard).not.toHaveBeenCalled();
		});

		it('создает dashboard страницу, если в пути нет "excel"', () => {
			window.location.hash = '#dashboard';

			router.changePageHandler();

			expect(mockRoutes.dashboard).toHaveBeenCalledWith(undefined);
			expect(mockRoutes.excel).not.toHaveBeenCalled();
		});

		it('демонтирует предыдущую страницу, если она существует', () => {
			router.page = mockPage;

			router.changePageHandler();

			expect(mockPage.destroy).toHaveBeenCalled();
		});

		it('не демонтирует страницу, если страница не существует', () => {
			router.page = null;

			router.changePageHandler();

			expect(mockPage.destroy).not.toHaveBeenCalled();
		});

		it('добавляет корневой элемент страницы в $placeholder', () => {
			router.changePageHandler();

			expect(mockDom.append).toHaveBeenCalledWith(mockDom);
		});

		it('вызывает afterRender для созданной страницы', () => {
			router.changePageHandler();

			expect(mockPage.afterRender).toHaveBeenCalled();
		});

		it('устанавливает созданную страницу в свойство page класса Router', () => {
			router.changePageHandler();

			expect(router.page).toBe(mockPage);
		});
	});

	describe('Метод destroy', () => {
		beforeEach(() => {
			router = new Router(mockSelector, mockRoutes);
		});

		it('удаляет слушатель hashchange', () => {
			const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

			router.destroy();

			expect(removeEventListenerSpy).toHaveBeenCalledWith('hashchange', expect.any(Function));
		});
	});
});
