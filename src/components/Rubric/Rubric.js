'use strict';

import React from 'react';

export default class Rubric extends React.Component {
	render(){
		var components = this.props.rubric.components.map(function(component, index){
		return (
			<Component className="component"
				title={component.title} 
				belowDescription={component.below_description}
				approachingDescription={component.approaching_description}
				meetsDescription={component.meets_description}
				exceedsDescription={component.exceeds_description}
				points={component.points} />
				);
		});
		return (
			<div className="rubric">
				{components}
			</div>
			);
	}
}

Rubric.propTypes = {
  body: React.PropTypes.string.isRequired
};