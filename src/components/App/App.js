/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import './App.less';

import React from 'react';
import invariant from 'react/lib/invariant';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import Navbar from '../Navbar';
import Feed from '../Feed';
import Post from '../Post';
import NotFoundPage from '../NotFoundPage';

export default class App extends React.Component {

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
    window.removeEventListener('click', this.handleClick);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }


  handlePopState(event) {
    AppActions.navigateTo(window.location.pathname, {replace: !!event.state});
  }

  handleClick(event) {
    if (event.button === 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.defaultPrevented) {
      return;
    }

    // Ensure link
    var el = event.target;
    while (el && el.nodeName !== 'A') {
      el = el.parentNode;
    }
    if (!el || el.nodeName !== 'A') {
      return;
    }

    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.getAttribute('download') || el.getAttribute('rel') === 'external') {
      return;
    }

    // Ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (el.pathname === location.pathname && (el.hash || link === '#')) {
      return;
    }

    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) {
      return;
    }

    // Check target
    if (el.target) {
      return;
    }

    // X-origin
    var origin = window.location.protocol + '//' + window.location.hostname +
      (window.location.port ? ':' + window.location.port : '');
    if (!(el.href && el.href.indexOf(origin) === 0)) {
      return;
    }

    // Rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    event.preventDefault();
    AppActions.loadPage(path, () => {
      AppActions.navigateTo(path);
    });
  }

  render() {
    var page = AppStore.getPage(this.props.path);
    invariant(page !== undefined, 'Failed to load page content.');
    this.props.onSetTitle(page.title);

    if (page.type === 'notfound') {
      this.props.onPageNotFound();
      return React.createElement(NotFoundPage, page);
    }

    return (
      <div className="App">
        <Navbar />
        <Feed className="feed" posts={POSTS} {...page} />
      </div>
    );
  }
}

var POSTS =
  [{"id":1,
  "student":{
    "id":2,
    "first_name":"Hettie",
    "last_name":"Metz"},
  "rubric":{
    "title":"Heart Diagram Rubric",
    "id":1,
    "components":[{
      "title":"Arteries",
      "id":1,
      "below_description":"Arteries are not present or barely present",
      "approaching_description":"Arteries are present, but may be connected incorrectly",
      "meets_description":"Arteries are present and connected correctly",
      "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
      "points":null},
      {"title":"Veins",
      "id":2,
      "below_description":"Veins are not present or barely present",
      "approaching_description":"Veins are present, but may be connected incorrectly",
      "meets_description":"Veins are present and connected correctly",
      "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
      "points":null},
      {"title":"Scientific Understanding",
      "id":3,"below_description":"Student does not demonstrate strong understanding of the material.",
      "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
      "meets_description":"Student has mastered the material","exceeds_description":"Student has exceeded expected mastery of the material.",
      "points":null}]},
  "comments":[{
    "id":1,
    "author_first_name":"Hettie",
    "author_last_name":"Metz",
    "text":"Here's my work from class today!"}]}
];

App.propTypes = {
  path: React.PropTypes.string.isRequired,
  onSetTitle: React.PropTypes.func.isRequired,
  onSetMeta: React.PropTypes.func.isRequired,
  onPageNotFound: React.PropTypes.func.isRequired
};
