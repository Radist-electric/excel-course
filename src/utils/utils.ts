/**
 * Первый символ в строке делает заглавным
 * @param {string} str - исходная строка
 * @return {string} строку, в которой первый символ заменён на заглавный
 */
export const capitalize = (str: string): string => {
	if (typeof str !== 'string') {
		return '';
	}

	return str.charAt(0).toUpperCase() + str.slice(1);
};

