import styles from './Loader.less';
import {$, Dom} from 'core/Dom';

export const getLoader = (): Dom => {
	const loader = $.create('div', styles.loader);

	loader.html(`
		<div class="${styles.lds}">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	`);

	return loader;
};
