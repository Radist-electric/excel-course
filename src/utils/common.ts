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
