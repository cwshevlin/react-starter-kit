'use strict';

import React from 'react';

export default class Layout extends React.Component {

  render(){
    return (
      <div>{this.props.children}</div>
    );
  }

}

export default class Drawers extends React.Component {

  statics: {
    identity(){
      return 'Drawers'
    }
  },
  
  render(){
    return (
      <div className="snap-drawers">
      {this.props.children}
      </div>
    );
  }
}

export default class Left extends React.Component {
  statics: {
    identity(){
      return 'Drawers.Left';
    }
  },
  render(){
    return (
      <div ref="left" className="snap-drawer snap-drawer-left">
      {this.props.children}
      </div>
    );
  }
}

export default class Right extends React.Component {
  statics: {
    identity(){
      return 'Drawers.Right';
    }
  },
  render(){
    return (
      <div ref="right" className="snap-drawer snap-drawer-right">
      {this.props.children}
      </div>
    );
  }
}

export default class Toggler extends React.Component {
  
  propTypes: {
    side: React.PropTypes.oneOf(['left', 'right']).isRequired
  },

  render(){
    var role = this.props.side == 'left' ?  'left-drawer-toggle' : 'right-drawer-toggle';
    return this.transferPropsTo(<span role={role}>{this.props.children}</span>);
  }
}


export default class Content extends React.Component {

  toggleNav(side){
    var state = this.snapper.state();
    if( state.state != 'closed' ){
      this.snapper.close();
      return;
    }
    if( (!!side && side == 'left') || state.info.opening == 'left' ){
      this.snapper.open('left');
      return;
    }
    this.snapper.open('right');
  },

  hideNav(){
    this.snapper.close();
  },

  componentDidMount(){
    this.leftToggler = $('[role="left-drawer-toggle"]');
    if( this.leftToggler.length ){
      this.leftToggler.on('click', this.toggleNav.bind(this, 'left'));
    }
    this.rightToggler = $('[role="right-drawer-toggle"]');
    if( this.rightToggler.length ){
      this.rightToggler.on('click', this.toggleNav.bind(this, 'right'));
    }
    this.drawerLinks = $('.snap-drawers').find('a');
    this.drawerLinks.on('click', this.hideNav);
    this.snapper = new SnapJS({
     element: this.refs.content.getDOMNode(),
     flickThreshold: 50,
     disable: 'right',
     easing: 'cubic-bezier(.55,0,.1,1)',
   });
  },

  componentWillUnmount(){
    if( this.leftToggler.length ){
      this.leftToggler.off('click');
    }
    if( this.rightToggler.length ){
      this.rightToggler.off('click');
    }
    this.drawerLinks.off('click');
  },

  render(){
    return (
      <div ref="content" className="snap-content">
      {this.props.children}
      </div>
    );
  }
}