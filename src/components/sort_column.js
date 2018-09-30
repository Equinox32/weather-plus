import React from 'react';

export default props => {
	return (
		<th onClick={props.onClick}>
			<a>
				{props.name}{' '}
				<span className="oi oi-chevron-top" aria-hidden="true" />
			</a>
		</th>
	);
};
