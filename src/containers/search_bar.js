import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = { term: '' };
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		// console.log(event.target.value);
		this.setState({ term: event.target.value });
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.setState({ term: '' });
		this.props.fetchWeather(this.state.term);
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="input-group">
				<input
					placeholder="Get a five-day forecast in your favorite cities"
					className="form-control"
					// The following attribute is to make SearchBar
					// a "controlled" component
					value={this.state.term}
					onChange={this.onInputChange}
				/>
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">
						Submit
					</button>
				</span>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		term: state.term
	};
}

// Anything returned from this function will end up as props on the
// BookList container
function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			fetchWeather: fetchWeather
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchBar);

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(SearchBar);
