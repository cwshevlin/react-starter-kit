'use strict';

import React from 'react';
import Rubric from '../Rubric';
import CommentsBox from '../CommentsBox';


export default class Post extends React.Component {
	render(){
		return (
			<div className="post">
			<div className="avatar"></div>
			<h5 className="author">
				{this.props.student.first_name + " "} 
				{this.props.student.last_name}
			</h5>
			<div className="media">
			</div>
			<Rubric rubric={this.props.rubric}/>
			<CommentsBox comments={this.props.comments}/>
			<div className="commentButton"><h5>Comment</h5></div>
			<div className="moreOptions">• • •</div>
			</div>
		);
	}
}

Post.propTypes = {
  body: React.PropTypes.string.isRequired
};