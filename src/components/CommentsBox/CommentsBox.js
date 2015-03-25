'use strict';

import React from 'react';
import Comment from '../Comment';

export default class CommentsBox extends React.Component {
	render(){
		var commentNodes = this.props.comments.map(function(comment, index){
			return (
				<Comment key={index} student={comment.student} text={comment.text}/>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}