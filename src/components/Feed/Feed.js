'use strict';

import './_posts.json'
import React from 'react';
import Post from '../Post';

export default class Feed extends React.Component {
	render() {
		var feedNodes = this.props.posts.map(function(post, index){
			return (
				<Post student={post.student} key={index} rubric={post.rubric} comments={post.comments}/>
				);
		});
		return (
			<div className="Feed">
				{feedNodes}
			</div>
		);
	}
}
