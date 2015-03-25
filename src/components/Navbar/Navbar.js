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
      <div className="navbar navbar-fixed-top" role="navigation">
        <div className="container">
            <span className="glyphicon glyphicon-menu-hamburger navbar-left"></span>
            <span>Gradeable</span>
            <a href="/raised-hands"><span className="glyphicon glyphicon-comment navbar-right"></span></a>
        </div>
      </div>
    );
  }

}
