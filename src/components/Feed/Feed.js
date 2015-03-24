'use strict';

import React from 'react';
import Post from '../Post';

export default class Feed extends React.Component {
	render() {
		console.log("updating feed");
		var feedNodes = this.props.posts.map(function(post, index){
			return (
				<Post student={post.student} key={index} rubric={post.rubric} comments={post.comments}/>
				);
		});
		return (
			<div className="feed">
				{feedNodes}
			</div>
		);
	}
}

Feed.propTypes = {
  body: React.PropTypes.string.isRequired
};