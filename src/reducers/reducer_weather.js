import { FETCH_WEATHER, SORT_WEATHER } from '../actions/index';
import _ from 'lodash';

function average(data) {
	return _.round(_.sum(data) / data.length);
}

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_WEATHER:
			// Gather data
			var cityData = {
				...action.payload.data
			};
			var temperatures = [];
			var pressures = [];
			var humiditys = [];
			const { lon, lat } = cityData.city.coord;
			const name = cityData.city.name;
			cityData.list.forEach(data => {
				temperatures = [...temperatures, data.main.temp];
				pressures = [...pressures, data.main.pressure];
				humiditys = [...humiditys, data.main.humidity];
			});

			// Add data to object
			var payload = {
				...action.payload.data,
				name: name,
				lon: lon,
				lat: lat,
				temperatures: temperatures,
				pressures: pressures,
				humiditys: humiditys,
				averageTemperature: average(temperatures),
				averagePressure: average(pressures),
				averageHumidity: average(humiditys)
			};

			return [payload, ...state];
		case SORT_WEATHER:
			return state.slice().sort((w1, w2) => {
				// This will handle the asc/desc sort by simply flipping w1 with w2
				if (action.payload.order === 'asc') {
					var a = { ...w1 };
					var b = { ...w2 };
				} else if (action.payload.order === 'desc') {
					var a = { ...w2 };
					var b = { ...w1 };
				}

				if (action.payload.sort === 'City') {
					if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
					if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
					return 0;
				} else if (action.payload.sort === 'Temperature (Kelvin)') {
					if (a.averageTemperature < b.averageTemperature) return -1;
					if (a.averageTemperature > b.averageTemperature) return 1;
					return 0;
				} else if (action.payload.sort === 'Pressure (hPa)') {
					if (a.averagePressure < b.averagePressure) return -1;
					if (a.averagePressure > b.averagePressure) return 1;
					return 0;
				} else if (action.payload.sort === 'Humidity (%)') {
					if (a.averageHumidity < b.averageHumidity) return -1;
					if (a.averageHumidity > b.averageHumidity) return 1;
					return 0;
				}
			});
		default:
			return state;
	}
}
