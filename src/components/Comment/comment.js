'use strict';

import React from 'react';

export default class Comment extends React.Component {
	render() {
		return (
			<div className="comment">
				<h6 className="commentAuthor">
					{this.props.author_first_name + " "}
					{this.props.author_last_name}
				</h6>
				<p>
					{this.props.text}
				</p>
			</div>
		);
	}
}

Comment.propTypes = {
  body: React.PropTypes.string.isRequired
};