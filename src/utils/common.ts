import {DebounceThrottleFunction, ListenerType, MethodNameType} from 'types';

/**
 * Делает первый символ в строке заглавным
 * @param {ListenerType} str - исходная строка
 * @return { Capitalize<ListenerType>} строку, в которой первый символ заменён на заглавный
 */
export const capitalizeListener = (str: ListenerType): Capitalize<ListenerType> => {
	if (typeof str !== 'string') {
		return '';
	}

	return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<string>;
};

/**
 * Возвращает имя метода из имени события (input => onInput)
 * @param {ListenerType} eventName - имя события
 * @return {MethodNameType} имя метода
 */
export const getMethodName = (eventName: ListenerType): MethodNameType => ('on' + capitalizeListener(eventName)) as MethodNameType;

/**
 * Возвращает функцию, в которую обёрнута исходная, вызов которой нужно отложить до тех пор, пока с последнего вызова не пройдёт заданный интервал
 * @param {Function} callback - исходная функция, для которой нужно отложить вызов
 * @param {number} delay - время в миллисекундах, на которое задерживается вызов функции
 * @return {DebounceThrottleFunction} функция, в которую обёрнута исходная функция
 */
export const debounce = (callback: DebounceThrottleFunction, delay: number = 100): DebounceThrottleFunction => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: any): void => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback.apply(null, args), delay);
	};
};

/**
 * Возвращает функцию, в которую обёрнута исходная, чтобы ограничить частоту вызовов функции до определенного интервала
 * @param {ThrottleFunction} callback - исходная функция, для которой нужно ограничить частоту вызовов
 * @param {number} delay - время в миллисекундах, на которое нужно ограничить частоту вызовов
 * @return {DebounceThrottleFunction} функция, в которую обёрнута исходная функция
 */
export const throttle = (callback: DebounceThrottleFunction, delay: number = 50): DebounceThrottleFunction => {
	let inThrottle: boolean;

	return function (this: any, ...args: any[]) {
		const context = this;

		if (!inThrottle) {
			callback.apply(context, args);
			inThrottle = true;

			setTimeout(() => {
				inThrottle = false;
			}, delay);
		}
	};
};

/**
 * Возвращает массив целых чисел в указанном диапазоне
 * @param {number} start - начальная позиция диапазона
 * @param {number} end - конечная позиция диапазона
 * @returns {number[]} массив целых чисел в указанном диапазоне
 */
export const getRange = (start: number, end: number): number[] => {
	let [startPosition, endPosition] = [start, end];

	if (start > end) {
		[endPosition, startPosition] = [start, end];
	}

	return new Array(endPosition - startPosition + 1)
		.fill('')
		.map((_, index) => startPosition + index);
};

/**
 * Сравнивает два значения на равенство
 * @param {any} a - первое значение для сравнения
 * @param {any} b - второе значение для сравнения
 * @returns {boolean} результат сравнения
 */
export const isEqual = (a: any, b: any): boolean => {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b);
	}

	return a === b;
};

/**
 * Работает с localStorage для сохранения и получения данных
 * @param {string} key - ключ для сохранения/получения данных
 * @param {any} data - данные для сохранения (если null, то выполняется чтение)
 * @returns {any | null} сохранённые данные при чтении или null при сохранении
 */
export const storage = (key: string, data: any = null): any | null => {
	if (data) {
		localStorage.setItem(key, JSON.stringify(data));
	} else {
		const savedData = localStorage.getItem(key);

		if (savedData) {
			return JSON.parse(savedData);
		}
	}

	return null;
};

/**
 * Преобразует camelCase строку в kebab-case
 * @param {string} str - строка в camelCase
 * @returns {string} строка в kebab-case
 */
export const convertCamelToDashCase = (str: string): string => str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

/**
 * Преобразует объект стилей в inline CSS строку
 * @param {Record<string, string | number>} styles - объект со стилями
 * @returns {string} строка inline CSS
 */
export const toInlineStyles = (styles: Record<string, number | string> = {}): string => Object.keys(styles)
	.map(key => `${convertCamelToDashCase(key)}: ${styles[key]}`)
	.join(';');

/**
 * Создает глубокую копию объекта
 * @param {T} obj - объект для клонирования
 * @returns {T} клонированный объект
 */
export const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

/**
 * Парсит значение ячейки, выполняя формулы если они начинаются с '='
 * @param {string} value - значение для парсинга
 * @returns {string | number} - результат парсинга или исходное значение
 */
export const parse = (value: string = ''): number | string => {
	if (value.startsWith('=')) {
		try {
			// eslint-disable-next-line no-eval
			return eval(value.slice(1));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			return value;
		}
	}

	return value;
};

/**
 * Возвращает имя ключа для localStorage
 * @param {string} param - параметр для ключа
 * @returns {string} имя ключа для localStorage
 */
export const getStorageName = (param: string): string => 'excel:' + param;

/**
 * Возвращает время в формате HH:MM
 * @param {Date} date - дата
 * @returns {string} время в формате HH:MM
 */
export const getHHMMtime = (date: Date): string => date.toLocaleTimeString('ru-RU', {
	hour: '2-digit',
	minute: '2-digit'
});

/**
 * Возвращает дату в формате DD.MM.YYYY
 * @param {Date} date - дата
 * @returns {string} дата в формате DD.MM.YYYY
 */
export const getDDMMYYYYDate = (date: Date): string => date.toLocaleDateString('ru-RU', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric'
});

/**
 * Возвращает дату и время в формате DD.MM.YYYY HH:MM
 * @param {Date} date - дата
 * @returns {string} дата и время в формате DD.MM.YYYY HH:MM
 */
export const getDDMMYYYYHHMMtime = (date: Date): string => getDDMMYYYYDate(date) + ' ' + getHHMMtime(date);

/**
 * Проверяет запущено ли приложение в режиме разработки.
 * @return {boolean}
 */
export const isDevMode = (): boolean => process.env.NODE_ENV === 'development';

/**
 * Проверяет запущено ли приложение в продуктовом режиме
 * @return {boolean}
 */
export const isProdMode = (): boolean => process.env.NODE_ENV === 'production';

/**
 * Предотвращает действие по умолчанию для события
 * @param {Event} event - событие
 * @returns {void}
 */
export const preventDefault = (event: Event): void => {
	event.preventDefault();
};
