export class Dom {
	$el: Element | null;

	constructor(selector: Element | string) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	html(html: Element | string) {
		if (!this.$el || !(this.$el instanceof Element)) {
			return this;
		}

		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}

		return this.$el.outerHTML.trim();
	}

	clear() {
		this.html('');
		return this;
	}

	on(eventType: string, callback: () => void) {
		if (this.$el) {
			this.$el.addEventListener(eventType, callback);
		}
	}

	off(eventType: string, callback: () => void) {
		if (this.$el) {
			this.$el.removeEventListener(eventType, callback);
		}
	}

	append(node: Dom | Element) {
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
}

export const $ = (selector: string | Element): Dom => {
	return new Dom(selector);
};

$.create = (tagName: string, classes = ''): Dom => {
	const el = document.createElement(tagName);

	if (classes) {
		el.classList.add(classes);
	}

	return $(el);
};
