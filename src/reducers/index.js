import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import SortReducer from './reducer_sort';

const rootReducer = combineReducers({
	weather: WeatherReducer,
	sort_column: SortReducer
});

export default rootReducer;
