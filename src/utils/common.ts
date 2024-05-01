import {ListenerType, MethodNameType} from 'types';

/**
 * Первый символ в строке делает заглавным
 * @param {string} str - исходная строка
 * @return {string} строку, в которой первый символ заменён на заглавный
 */
export const capitalize = (str: string): Capitalize<string> => {
	if (typeof str !== 'string') {
		return '';
	}

	return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<string>;
};

// input => onInput
export const getMethodName = (eventName: ListenerType): MethodNameType => {
	return ('on' + capitalize(eventName)) as MethodNameType;
};
