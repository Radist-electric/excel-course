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
 * Получает имя метода из имени события (input => onInput)
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
