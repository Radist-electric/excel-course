import {$, Dom} from 'core/Dom';
import {COL_MIN_WIDTH, ROW_MIN_HEIGHT} from 'data/constants';
import {VoidFunc} from 'types';

/**
 * Обрабатывает зажатие левой кнопки мыши
 * @param {Dom} $root - корневой элемент таблицы
 * @param {MouseEvent} event - событие мыши
 * @return { Promise<void>}
 */
export function handleResize ($root: Dom, event: MouseEvent): Promise<any> {
	return new Promise(resolve => {
		const target = event.target as HTMLDivElement;
		const type = target.dataset.resize;

		const $resizeElement = $(target);
		const $parent = $resizeElement.closest('[data-type="resizable"]');

		$root.removeClass('excel__table_resize-el-hover-enable');

		let handleMouseMove: (e: MouseEvent) => void = () => void 0;
		let handleMouseUp: VoidFunc = () => void 0;

		if ($parent && type === 'col') {
			$resizeElement.css({
				height: '100vh',
				opacity: 1
			});

			const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
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
					const value = Math.max(COL_MIN_WIDTH, colWidth);

					cells.forEach(cell => {
						$(cell).css({width: value + 'px'});
					});

					$resizeElement.css({
						height: null,
						opacity: null,
						right: 0
					});

					resolve({
						id: $parent.data.col,
						type: 'col',
						value
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
					const value = Math.max(ROW_MIN_HEIGHT, rowHeight);

					$parent.css({height: value + 'px'});
					$resizeElement.css({
						bottom: 0,
						opacity: null,
						width: null
					});

					resolve({
						id: $parent.data.row,
						type: 'row',
						value
					});
				};
			}
		}

		document.onmousemove = handleMouseMove;

		document.onmouseup = () => {
			$root.addClass('excel__table_resize-el-hover-enable');
			handleMouseUp();
			document.onmousemove = null;
		};
	});
}
