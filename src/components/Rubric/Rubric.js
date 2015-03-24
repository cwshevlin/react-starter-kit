'use strict';

import React from 'react';
import RubricCategory from '../RubricCategory';

export default class Rubric extends React.Component {
	render(){
		var categories = this.props.rubric.components.map(function(category, index){
		return (
			<RubricCategory className="category"
				title={category.title} 
				belowDescription={category.below_description}
				approachingDescription={category.approaching_description}
				meetsDescription={category.meets_description}
				exceedsDescription={category.exceeds_description}
				points={category.points} />
				);
		});
		return (
			<div className="rubric">
				{categories}
			</div>
			);
	}
}

Rubric.propTypes = {
  body: React.PropTypes.string.isRequired
};