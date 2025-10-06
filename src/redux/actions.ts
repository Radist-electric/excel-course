import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE, UPDATE_LAST_OPENED} from 'redux/actionTypes';

// Action Creator
const changeText = (data: any) => ({
	data,
	type: CHANGE_TEXT
});

const tableResize = (data: any) => ({
	data,
	type: TABLE_RESIZE
});

const changeStyles = (data: any) => ({
	data,
	type: CHANGE_STYLES
});

const changeTitle = (data: any) => ({
	data,
	type: CHANGE_TITLE
});

const applyStyle = (data: any) => ({
	data,
	type: APPLY_STYLE
});

const updateLastOpened = () => ({
	data: Date.now(),
	type: UPDATE_LAST_OPENED
});

export {
	applyStyle,
	changeText,
	changeStyles,
	changeTitle,
	tableResize,
	updateLastOpened
};
