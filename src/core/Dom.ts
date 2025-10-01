import {TableCellId, VoidFunc} from 'types';
import {convertCamelToDashCase} from 'utils/common';

export class Dom {
	$el: Element | null;

	constructor (elementOrSelector: Element | string) {
		this.$el = typeof elementOrSelector === 'string'
			? document.querySelector(elementOrSelector) // Element | null
			: elementOrSelector;
	}

	/**
	 * Возвращает данные элемента
	 * @returns {DOMStringMap} данные элемента
	 */
	get data (): DOMStringMap {
		if (this.$el) {
			const element = this.$el as HTMLElement;
			return element.dataset;
		}

		return {};
	}

	/**
	 * Устанавливает HTML-код элемента
	 * @param {Element | string} html - HTML-код элемента
	 * @returns {string | this} HTML-код элемента или this
	 */
	html (html: Element | string): string | this {
		if (!this.$el || !(this.$el instanceof Element)) {
			return this;
		}

		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}

		return this.$el.outerHTML.trim();
	}

	/**
	 * Устанавливает текст элемента
	 * @param {Dom | string} text - текст элемента
	 * @returns {string | this} текст элемента или this
	 */
	text (text?: Dom | string): string | this {
		if (!this.$el) {
			return this;
		}

		if (typeof text === 'string') {
			this.$el.textContent = text;
			return this;
		}

		if (this.$el.tagName.toLowerCase() === 'input') {
			const inputElement = this.$el as HTMLInputElement;
			return inputElement.value.trim();
		}

		if (this.$el.textContent) {
			return this.$el.textContent.trim();
		}

		return this;
	}

	/**
	 * Устанавливает фокус на элемент
	 * @returns {this} this
	 */
	focus (): this {
		if (this.$el) {
			const element = this.$el as HTMLElement;
			const selection = window.getSelection();

			element.focus();

			// Перемещаем курсор в конец строки
			if (selection) {
				const range = document.createRange();

				range.selectNodeContents(element);
				range.collapse(false);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		}

		return this;
	}

	/**
	 * Очищает элемент
	 * @returns {this} this
	 */
	clear (): this {
		this.html('');
		return this;
	}

	/**
	 * Устанавливает или получает атрибут элемента
	 * @param {string} name - имя атрибута
	 * @param {string} value - значение атрибута
	 * @returns {string | this} значение атрибута или this
	 */
	attr (name: string, value?: string): string | this {
		if (!this.$el) {
			return this;
		}

		if (value !== undefined) {
			this.$el.setAttribute(name, value);
			return this;
		}

		return this.$el.getAttribute(name) || '';
	}

	/**
	 * Добавляет обработчик события
	 * @param {string} eventType - тип события
	 * @param {VoidFunc} callback - функция обработчика
	 * @returns {this} this
	 */
	on (eventType: string, callback: VoidFunc): this {
		if (this.$el) {
			this.$el.addEventListener(eventType, callback);
		}

		return this;
	}

	/**
	 * Удаляет обработчик события
	 * @param {string} eventType - тип события
	 * @param {VoidFunc} callback - функция обработчика
	 * @returns {this} this
	 */
	off (eventType: string, callback: VoidFunc): this {
		if (this.$el) {
			this.$el.removeEventListener(eventType, callback);
		}

		return this;
	}

	/**
	 * Возвращает идентификатор элемента
	 * @returns {string} идентификатор элемента
	 */
	id (): string {
		return this.data.id || '';
	}

	/**
	 * Возвращает идентификатор элемента в виде объекта
	 * @returns {TableCellId} идентификатор элемента в виде объекта
	 */
	idAsObject (): TableCellId {
		const parsed = this.id().split(':');

		return {
			col: Number(parsed[1]),
			row: Number(parsed[0])
		};
	}

	/**
	 * Добавляет элемент в текущий элемент
	 * @param {Dom | Element} node - элемент для добавления
	 * @returns {this} this
	 */
	append (node: Dom | Element): this {
		const currentNode = node instanceof Dom ? node.$el : node;

		if (this.$el instanceof Element && currentNode instanceof Element) {
			if ('append' in Element.prototype) {
				this.$el.append(currentNode);
			} else {
				this.$el.appendChild(currentNode);
			}
		} else {
			console.error('this.$el or currentNode is not instance of Element');
		}

		return this;
	}

	/**
	 * Возвращает ближайший элемент, соответствующий селектору
	 * @param {string} selector - селектор
	 * @returns {Dom | null} ближайший элемент, соответствующий селектору
	 */
	closest (selector: string): Dom | null {
		const closestElement = this.$el ? this.$el.closest(selector) : null;
		return closestElement ? $(closestElement) : null;
	}

	/**
	 * Возвращает координаты элемента
	 * @returns {DOMRect | null} координаты элемента
	 */
	getCoords (): DOMRect | null {
		return this.$el ? this.$el.getBoundingClientRect() : null;
	}

	/**
	 * Возвращает первый элемент, соответствующий селектору
	 * @param {string} selector - селектор
	 * @returns {Dom | null} первый элемент, соответствующий селектору
	 */
	find (selector: string): Dom | null {
		if (this.$el) {
			const foundEl = this.$el.querySelector(selector);
			return foundEl ? $(foundEl) : null;
		}

		return null;
	}

	/**
	 * Возвращает все элементы, соответствующие селектору
	 * @param {string} selector - селектор
	 * @returns {HTMLElement[]} все элементы, соответствующие селектору
	 */
	findAll (selector: string): HTMLElement[] {
		return this.$el ? Array.from(this.$el.querySelectorAll(selector)) as HTMLElement[] : [];
	}

	/**
	 * Устанавливает стили элемента
	 * @param {Record<string, number | string | null>} styles - стили элемента
	 * @returns {void}
	 */
	css (styles: Record<string, number | string | null> = {}): void {
		if (this.$el) {
			const element = this.$el as HTMLElement;

			Object
				.keys(styles)
				.forEach(key => {
					const value = styles[key];
					const cssKey = convertCamelToDashCase(key);

					if (value === null) {
						element.style.removeProperty(cssKey);
					} else {
						element.style.setProperty(cssKey, String(value));
					}
				});
		}
	}

	/**
	 * Возвращает стили элемента
	 * @param {string[]} styles - стили элемента
	 * @returns {Record<string, string>} стили элемента
	 */
	getStyles (styles: string[] = []): Record<string, string> {
		if (!this.$el) {
			return {};
		}

		const element = this.$el as HTMLElement;

		return styles.reduce((res, style) => {
			res[style] = element.style[style as any];
			return res;
		}, {} as Record<string, string>);
	}

	/**
	 * Добавляет класс элементу
	 * @param {string} className - класс
	 * @returns {this} this
	 */
	addClass (className: string): this {
		if (this.$el) {
			const element = this.$el as HTMLElement;

			element.classList.add(className);
		}

		return this;
	}

	/**
	 * Удаляет класс у элемента
	 * @param {string} className - класс
	 * @returns {this} this
	 */
	removeClass (className: string): this {
		if (this.$el) {
			const element = this.$el as HTMLElement;

			element.classList.remove(className);
		}

		return this;
	}
}

/**
 * Возвращает элемент по селектору
 * @param {Element | string} selector - селектор
 * @returns {Dom} элемент
 */
export const $ = (selector: Element | string): Dom => new Dom(selector);

/**
 * Создаёт элемент
 * @param {string} tagName - тег элемента
 * @param {string} classNames - классы элемента
 * @returns {Dom} элемент
 */
$.create = (tagName: string, classNames: string = ''): Dom => {
	const el = document.createElement(tagName);

	if (classNames) {
		const splittedClassNames = classNames.split(' ');

		splittedClassNames.forEach(className => el.classList.add(className));
	}

	return $(el);
};
