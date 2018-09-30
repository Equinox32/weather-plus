import { SORT_WEATHER } from '../actions/index';

export default function(state = {}, action) {
	//	console.log('Action	received	(post	middleware):',	action);

	switch (action.type) {
		case SORT_WEATHER:
			return { ...action.payload };
		default:
			return state;
	}
}
