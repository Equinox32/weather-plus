import React from 'react';

export default props => {
	return (
		<th>
			{props.name}{' '}
			<span className="oi oi-chevron-top" aria-hidden="true" />
		</th>
	);
};
