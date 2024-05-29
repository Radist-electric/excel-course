import {VoidFunc, VoidFuncWithArgs} from 'types';

export class Emitter {
	listeners: {[key: string]: Array<(...args: any) => void>};

	constructor () {
		this.listeners = {};
	}

	/**
	 * Уведомляет слушателей, если они есть
	 * @param {string} event - эмиттируемое событие
	 * @param {any} args - параметры, передаваемые вместе с событием
	 * @returns {boolean} результат выполнения уведомления
	 */
	emit (event: string, ...args: any): boolean {
		if (Array.isArray(this.listeners[event])) {
			this.listeners[event].forEach(listener => {
				listener(...args);
			});

			return true;
		}

		return true;
	}

	/**
	 * Подписывает на уведомление (добавляет нового слушателя)
	 * @param {string} event - событие, на которое выполняется подписка
	 * @param {VoidFuncWithArgs} fn - функция, вызываемая при наступлении события
	 * @returns {VoidFunc} функция отписки от события
	 */
	subscribe (event: string, fn: VoidFuncWithArgs): VoidFunc {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);

		return () => {
			this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
		};
	}
}

// Example
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('vladilen', data => console.log(data))
// emitter.emit('1231231', 42)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After 4 seconds')
// }, 4000)
