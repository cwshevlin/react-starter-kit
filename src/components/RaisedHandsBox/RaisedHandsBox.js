'use strict';

import React from 'react';
import RaisedHand from '../RaisedHand';

export default class RaisedHandsBox extends React.Component {
	render(){
		var raisedHandsNodes = this.props.raisedHands.map (function(raisedHand, index){
			return (
				<RaisedHand student={raisedHand.student} question={raisedHand.question} comments={raisedHand.comments} key={index} />
				);
		});
		return (
			<div className="raisedHandsBox">
				{raisedHandsNodes}
			</div>
		);
	}
}
