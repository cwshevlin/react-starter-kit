/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import React from 'react';

export default class Navbar extends React.Component {

  render() {
    return (
      <nav>
        <span className="glyphicon glyphicon-menu-hamburger navbar-left"></span>
        <span id="navBarTitle">Gradeable</span>
        <a href="/raised-hands"><span id="raisedHandsIcon" className="glyphicon glyphicon-comment"></span></a>
      </nav>
    );
  }

}
