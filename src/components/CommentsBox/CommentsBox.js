'use strict';

import React from 'react';
import Comment from '../Comment';

export default class CommentsBox extends React.Component {
	render(){
		var commentNodes = this.props.comments.map(function(comment, index){
			return (
				<Comment author_first_name={comment.author_first_name} author_last_name={comment.author_last_name} text={comment.text} key={index}/>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}