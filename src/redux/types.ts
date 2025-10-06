export type ColState = {[key: number]: number};
export type RowState = {[key: number]: number};
export type DataState = {[key: string]: string};
export type StylesState = {[key: string]: Record<string, string>};

export type State = {
	colState: ColState,
	currentStyles: Record<string, string>,
	currentText: string,
	dataState: DataState,
	lastOpenedAt: number,
	rowState: RowState,
	stylesState: StylesState,
	tableTitle: string,
	title: string
};

export type Action = {
	data?: any,
	type: string
};

export type RootReducer<State, Action> = (state: State, action: Action) => State;

export type Store<State, Action> = {
	dispatch: (action: Action) => void,
	getState: () => State,
	subscribe: (fn: (state: State) => void) => {unsubscribe: () => void}
};
