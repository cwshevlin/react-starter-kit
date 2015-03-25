'use strict';

import React from 'react';

export default class Comment extends React.Component {
	render() {
		return (
			<div className="comment">
				<h6 className="commentStudent">
					{this.props}
				</h6>
				<p>
					{this.props.text}
				</p>
			</div>
		);
	}
}