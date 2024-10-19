export type Action = {
	type: string
};

export type State = {};

export type RootReducer<State, Action> = (state: State, action: Action) => State;

export type Store<State, Action> = {
	subscribe: (fn: (state: State) => void) => {unsubscribe: () => void},
	dispatch: (action: Action) => void,
	getState: () => State
};
