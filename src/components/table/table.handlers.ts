import {$} from 'core/Dom';
import {COL_MIN_WIDTH, ROW_MIN_HEIGHT} from 'data/constants';
import {Table} from './Table';

/**
 * Обрабатывает зажатие левой кнопки мыши
 * @param {Table} this - контекст
 * @param {MouseEvent} event - событие мыши
 * @return {void}
 */
export function handleMousedown (this: Table, event: MouseEvent): void {
	const target = event.target as HTMLDivElement;

	if (target) {
		const type = target.dataset.resize;

		if (type) {
			const $resizeElement = $(target);
			const $parent = $resizeElement.closest('[data-type="resizable"]');

			this.$root.removeClass('excel__table_resize-el-hover-enable');

			let handleMouseMove: (e: MouseEvent) => void = () => void 0;
			let handleMouseUp: () => void = () => void 0;

			if ($parent && type === 'col') {
				$resizeElement.css({
					height: '100vh',
					opacity: 1
				});

				const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
				const coords = $parent.getCoords();

				if (coords) {
					let colWidth = coords.width;

					handleMouseMove = (e: MouseEvent) => {
						const delta = e.pageX - coords.right;

						colWidth = coords.width + delta;

						if (colWidth >= COL_MIN_WIDTH) {
							$resizeElement.css({right: -delta + 'px'});
						}
					};

					handleMouseUp = () => {
						cells.forEach(cell => {
							$(cell).css({width: Math.max(COL_MIN_WIDTH, colWidth) + 'px'});
						});

						$resizeElement.css({
							height: null,
							opacity: null,
							right: 0
						});
					};
				}
			}

			if ($parent && type === 'row') {
				const coords = $parent.getCoords();

				if (coords) {
					let rowHeight = coords.height;

					$resizeElement.css({
						opacity: 1,
						width: '100vw'
					});

					handleMouseMove = (e: MouseEvent) => {
						const delta = e.pageY - coords.bottom;

						rowHeight = coords.height + delta;

						if (rowHeight >= ROW_MIN_HEIGHT) {
							$resizeElement.css({bottom: -delta + 'px'});
						}
					};

					handleMouseUp = () => {
						$parent.css({height: Math.max(ROW_MIN_HEIGHT, rowHeight) + 'px'});
						$resizeElement.css({
							bottom: 0,
							opacity: null,
							width: null
						});
					};
				}
			}

			document.onmousemove = handleMouseMove;

			document.onmouseup = () => {
				this.$root.addClass('excel__table_resize-el-hover-enable');
				handleMouseUp();
				document.onmousemove = null;
			};
		}
	}
}
