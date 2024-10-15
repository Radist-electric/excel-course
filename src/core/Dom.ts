import {TableCellId, VoidFunc} from 'types';

export class Dom {
	$el: Element | null;

	constructor (elementOrSelector: Element | string) {
		this.$el = typeof elementOrSelector === 'string'
			? document.querySelector(elementOrSelector) // Element | null
			: elementOrSelector;
	}

	get data (): DOMStringMap {
		if (this.$el) {
			const element = this.$el as HTMLElement;
			return element.dataset;
		}

		return {};
	}

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

	text (text?: Dom | string) {
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

		return this.$el.textContent?.trim();
	}

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

	clear (): this {
		this.html('');
		return this;
	}

	on (eventType: string, callback: VoidFunc): this {
		if (this.$el) {
			this.$el.addEventListener(eventType, callback);
		}

		return this;
	}

	off (eventType: string, callback: VoidFunc): this {
		if (this.$el) {
			this.$el.removeEventListener(eventType, callback);
		}

		return this;
	}

	id (): string {
		return this.data.id || '';
	}

	idAsObject (): TableCellId {
		const parsed = this.id().split(':');

		return {
			col: Number(parsed[1]),
			row: Number(parsed[0])
		};
	}

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

	closest (selector: string): Dom | null {
		const closestElement = this.$el ? this.$el.closest(selector) : null;
		return closestElement ? $(closestElement) : null;
	}

	getCoords (): DOMRect | null {
		return this.$el ? this.$el.getBoundingClientRect() : null;
	}

	find (selector: string): Dom | null {
		if (this.$el) {
			const foundEl = this.$el.querySelector(selector);
			return foundEl ? $(foundEl) : null;
		}

		return null;
	}

	findAll (selector: string): HTMLElement[] {
		return this.$el ? Array.from(this.$el.querySelectorAll(selector)) as HTMLElement[] : [];
	}

	css (styles: Record<string, string | number | null> = {}) {
		if (this.$el) {
			const element = this.$el as HTMLElement;

			Object
				.keys(styles)
				.forEach(key => {
					if (styles[key] === null) {
						element.style.removeProperty(key);
					} else {
						element.style.setProperty(key, String(styles[key]));
					}
				});
		}
	}

	addClass (className: string): this {
		if (this.$el) {
			const element = this.$el as HTMLElement;

			element.classList.add(className);
		}

		return this;
	}

	removeClass (className: string): this {
		if (this.$el) {
			const element = this.$el as HTMLElement;

			element.classList.remove(className);
		}

		return this;
	}
}

export const $ = (selector: string | Element): Dom => new Dom(selector);

$.create = (tagName: string, classNames = ''): Dom => {
	const el = document.createElement(tagName);

	if (classNames) {
		const splittedClassNames = classNames.split(' ');

		splittedClassNames.forEach(className => el.classList.add(className));
	}

	return $(el);
};
