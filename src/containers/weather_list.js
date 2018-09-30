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
		let cityOrderClass = '';
		let cityOrder = '';
		let tempOrderClass = '';
		let tempOrder = '';
		let presOrderClass = '';
		let presOrder = '';
		let humnOrderClass = '';
		let humnOrder = '';
		if (this.props.sort_column.order) {
			if (this.props.sort_column.sort === 'City') {
				if (this.props.sort_column.order === 'asc') {
					cityOrderClass = 'oi oi-chevron-top';
					cityOrder = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					cityOrderClass = 'oi oi-chevron-bottom';
					cityOrder = 'asc';
				}
			} else if (this.props.sort_column.sort === 'Temperature (Kelvin)') {
				if (this.props.sort_column.order === 'asc') {
					tempOrderClass = 'oi oi-chevron-top';
					tempOrder = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					tempOrderClass = 'oi oi-chevron-bottom';
					tempOrder = 'asc';
				}
			} else if (this.props.sort_column.sort === 'Pressure (hPa)') {
				if (this.props.sort_column.order === 'asc') {
					presOrderClass = 'oi oi-chevron-top';
					presOrder = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					presOrderClass = 'oi oi-chevron-bottom';
					presOrder = 'asc';
				}
			} else if (this.props.sort_column.sort === 'Humidity (%)') {
				if (this.props.sort_column.order === 'asc') {
					humnOrderClass = 'oi oi-chevron-top';
					humnOrder = 'desc';
				} else if (this.props.sort_column.order === 'desc') {
					humnOrderClass = 'oi oi-chevron-bottom';
					humnOrder = 'asc';
				}
			}
		}
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<SortColumn
							name="City"
							order={cityOrderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'City',
									cityOrder || 'asc'
								)
							}
						/>
						<SortColumn
							name="Temperature (Kelvin)"
							order={tempOrderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'Temperature (Kelvin)',
									tempOrder || 'asc'
								)
							}
						/>
						<SortColumn
							name="Pressure (hPa)"
							order={presOrderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'Pressure (hPa)',
									presOrder || 'asc'
								)
							}
						/>
						<SortColumn
							name="Humidity (%)"
							order={humnOrderClass || ''}
							onClick={() =>
								this.props.sortWeather(
									'Humidity (%)',
									humnOrder || 'asc'
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
