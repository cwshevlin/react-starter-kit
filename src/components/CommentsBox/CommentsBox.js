'use strict';

import React from 'react';

export default class CommentsBox extends React.Component {
	render(){
		var commentNodes = this.props.data.map(function(comment, index){
			return (
				<Comment author={comment.author} text={comment.text} key={index}/>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}

CommentsBox.propTypes = {
  body: React.PropTypes.string.isRequired
};