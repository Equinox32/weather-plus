import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMaps from '../components/google_maps';
import SortColumn from '../components/sort_column';
import { bindActionCreators } from 'redux';
import { sortWeather } from '../actions';

class WeatherList extends Component {
	renderWeather(cityData) {
		return (
			<tr key={cityData.name}>
				<td>
					<GoogleMaps lon={cityData.lon} lat={cityData.lat} />{' '}
				</td>{' '}
				<td>
					<Chart
						data={cityData.temperatures}
						avg={cityData.averageTemperature}
						color="red"
						units="Kelvin"
					/>
				</td>
				<td>
					<Chart
						data={cityData.pressures}
						avg={cityData.averagePressure}
						color="blue"
						units="hPa"
					/>
				</td>
				<td>
					<Chart
						data={cityData.humiditys}
						avg={cityData.averageHumidity}
						color="green"
						units="%"
					/>
				</td>
			</tr>
		);
	}
	render() {
		// This is the function for alternating the arrows and updating
		// sort_column.order
		// TODO: Make this much better code......
		// let cityOrderClass = '';
		// let cityOrder = '';
		// let tempOrderClass = '';
		// let tempOrder = '';
		// let presOrderClass = '';
		// let presOrder = '';
		// let humnOrderClass = '';
		// let humnOrder = '';
		let city = { name: 'City', orderClass: '', order: '' };
		let temp = { name: 'Temperature (Kelvin)', orderClass: '', order: '' };
		let pres = { name: 'Pressure (hPa)', orderClass: '', order: '' };
		let humn = { name: 'Humidity (%)', orderClass: '', order: '' };
		if (this.props.sort_column.order) {
			if (this.props.sort_column.sort === 'City') {
				city.name = <u>City</u>;
				if (this.props.sort_column.order === 'asc') {
					city.orderClass = 'oi oi-chevron-top';
					city.order = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					city.orderClass = 'oi oi-chevron-bottom';
					city.order = 'asc';
				}
			} else if (this.props.sort_column.sort === 'Temperature (Kelvin)') {
				temp.name = <u>Temperature (Kelvin)</u>;
				if (this.props.sort_column.order === 'asc') {
					temp.orderClass = 'oi oi-chevron-top';
					temp.order = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					temp.orderClass = 'oi oi-chevron-bottom';
					temp.order = 'asc';
				}
			} else if (this.props.sort_column.sort === 'Pressure (hPa)') {
				pres.name = <u>Pressure (hPa)</u>;
				if (this.props.sort_column.order === 'asc') {
					pres.orderClass = 'oi oi-chevron-top';
					pres.order = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					pres.orderClass = 'oi oi-chevron-bottom';
					pres.order = 'asc';
				}
			} else if (this.props.sort_column.sort === 'Humidity (%)') {
				humn.name = <u>Humidity (%)</u>;
				if (this.props.sort_column.order === 'asc') {
					humn.orderClass = 'oi oi-chevron-top';
					humn.order = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					humn.orderClass = 'oi oi-chevron-bottom';
					humn.order = 'asc';
				}
			}
		}
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<SortColumn
							name={city.name}
							order={city.orderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'City',
									city.order || 'asc'
								)
							}
						/>
						<SortColumn
							name={temp.name}
							order={temp.orderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'Temperature (Kelvin)',
									temp.order || 'asc'
								)
							}
						/>
						<SortColumn
							name={pres.name}
							order={pres.orderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'Pressure (hPa)',
									pres.order || 'asc'
								)
							}
						/>
						<SortColumn
							name={humn.name}
							order={humn.orderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'Humidity (%)',
									humn.order || 'asc'
								)
							}
						/>
					</tr>
				</thead>
				<tbody>{this.props.weather.map(this.renderWeather)}</tbody>
			</table>
		);
	}
}
//	ES6	syntax	for	the	following
function mapStateToProps(state) {
	return { sort_column: state.sort_column, weather: state.weather };
}
// function mapStateToProps({ weather }, { sort_column }) {
// 	return { weather }, { sort_column };
// }

// function mapStateToProps({ weather }) {
// 	return { weather };
// }

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
