import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list';

export default class App extends Component {
	render() {
		return (
			<div className="search-bar">
				<div>
					<p>
						Search any city by name and get a forecast and google
						maps display. The columns are also sortable via{' '}
						<a href="https://redux.js.org/" target="_blank">
							Redux for React!
						</a>
					</p>
				</div>
				<SearchBar />
				<WeatherList />
			</div>
		);
	}
}
