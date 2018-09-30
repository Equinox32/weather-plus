import React from 'react';

export default props => {
	return (
		<th onClick={props.onClick}>
			<a>
				{props.name} <span className={props.order} aria-hidden="true" />
			</a>
		</th>
	);
};
