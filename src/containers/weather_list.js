import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMaps from '../components/google_maps';
import SortColumn from '../components/sort_column';
import { bindActionCreators } from 'redux';
import { sortWeather } from '../actions';

class WeatherList extends Component {
	renderWeather(cityData) {
		const name = cityData.city.name;
		var temperatures = [];
		var pressures = [];
		var humiditys = [];
		cityData.list.forEach(data => {
			temperatures = [...temperatures, data.main.temp];
			pressures = [...pressures, data.main.pressure];
			humiditys = [...humiditys, data.main.humidity];
		});
		const { lon, lat } = cityData.city.coord;
		return (
			<tr key={name}>
				<td>
					<GoogleMaps lon={lon} lat={lat} />{' '}
				</td>{' '}
				<td>
					<Chart data={temperatures} color="red" units="Kelvin" />
				</td>
				<td>
					<Chart data={pressures} color="blue" units="hPa" />
				</td>
				<td>
					<Chart data={humiditys} color="green" units="%" />
				</td>
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<SortColumn
							name="City"
							onClick={() => this.props.sortWeather()}
						/>
						<SortColumn
							name="Temperature (Kelvin)"
							onClick={() => this.props.sortWeather('test')}
						/>
						<SortColumn
							name="Pressure (hPa)"
							onClick={() => this.props.sortWeather('test')}
						/>
						<SortColumn
							name="Humidity (%)"
							onClick={() => this.props.sortWeather('test')}
						/>
					</tr>
				</thead>
				<tbody>{this.props.weather.map(this.renderWeather)}</tbody>
			</table>
		);
	}
}
//	ES6	syntax	for	the	following
//	function	mapStateToProps(state){
//		return	{	weather:state.weather	};
//	}
function mapStateToProps({ weather }) {
	return { weather };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			sortWeather: sortWeather
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WeatherList);
