'use strict';

import React from 'react';

export default class Feed extends React.Component {

	render(){
		return (
			<div className="post">
			<div className="avatar"></div>
			<h5 className="author">
				{this.props.author}
			</h5>
			<div className="media">
			</div>
			<PostRubric/>
			<PostCommentList data={this.props.comments}/>
			<div className="commentButton"><h5>Comment</h5></div>
			<div className="moreOptions">• • •</div>
			</div>
		);
	}

}


Feed.propTypes = {
  body: React.PropTypes.string.isRequired
};