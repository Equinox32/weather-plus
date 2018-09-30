import { FETCH_WEATHER, SORT_WEATHER } from '../actions/index';
export default function(state = [], action) {
	//	console.log('Action	received	(post	middleware):',	action);

	switch (action.type) {
		case FETCH_WEATHER:
			return [action.payload.data, ...state];
		case SORT_WEATHER:
			// console.log('state before');
			// console.log(state);
			// console.log('action.payload: ' + action.payload);

			state[0] = {
				...state[0],
				sort: action.payload,
				order: action.payload
			};
			// console.log('state after');
			// console.log(state);
			return state;

		// return state;
	}
	return state;
}
