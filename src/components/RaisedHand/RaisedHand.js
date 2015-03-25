'use strict';

import React from 'react';
import CommentsBox from '../Comment';

export default class RaisedHand extends React.Component {
	render(){
		return (
			<div className="raisedHand">
				<h6 className="raisedHandStudent">
					{this.props.student.first_name + " "}
					{this.props.student.last_name}
				</h6>
				<p>
					{this.props.question}
				</p>
				<CommentsBox comments={this.props.comments}/>
				{console.log(this.props.comments)}
				
			</div>
		);
		}
	}
