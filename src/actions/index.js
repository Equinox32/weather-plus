import axios from 'axios';
require('dotenv').config();
console.log(process.env.REACT_APP_WEATHER_API_KEY);
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const SORT_WEATHER = 'SORT_WEATHER';

export function fetchWeather(city) {
	const url = `${ROOT_URL}&q=${city},us`;

	// axios.get(url) returns a promise
	const request = axios.get(url);

	// console.log('Requset (pre middleware):', request);

	return {
		type: FETCH_WEATHER,
		payload: request
	};
}

export function sortWeather(sort, order) {
	return {
		type: SORT_WEATHER,
		payload: { sort, order }
	};
}
