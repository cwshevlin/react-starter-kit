'use strict';

import React from 'react';

export default class Feed extends React.Component {
  render() {
		console.log("updating feed");
		var feedNodes = this.props.data.map(function(post, index){
			return (
				<Post url="posts.json" author={post.author} key={index} comments={post.comments}/>
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