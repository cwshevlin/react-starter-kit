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
        <Navbar className="NavBar" />
        <Feed className="Feed" posts={POSTS} {...page} />
      </div>
    );
  }
}


App.propTypes = {
  path: React.PropTypes.string.isRequired,
  onSetTitle: React.PropTypes.func.isRequired,
  onSetMeta: React.PropTypes.func.isRequired,
  onPageNotFound: React.PropTypes.func.isRequired
};

var POSTS = [
  {
    "id":1,
    "student":{
      "id":2,
      "first_name":"Hettie",
      "last_name":"Metz"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":1,
      "components":[
        {
          "title":"Arteries",
          "id":1,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":2,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":3,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":1,
        "author_first_name":"Hettie",
        "author_last_name":"Metz",
        "text":"Here's my work from class today!"
      }
    ]
  },
  {
    "id":2,
    "student":{
      "id":3,
      "first_name":"Lera",
      "last_name":"Okuneva"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":2,
      "components":[
        {
          "title":"Arteries",
          "id":4,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":5,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":6,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":2,
        "author_first_name":"Lera",
        "author_last_name":"Okuneva",
        "text":"Here you go!"
      }
    ]
  },
  {
    "id":3,
    "student":{
      "id":4,
      "first_name":"Pauline",
      "last_name":"Murazik"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":3,
      "components":[
        {
          "title":"Arteries",
          "id":7,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":8,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":9,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":3,
        "author_first_name":"Pauline",
        "author_last_name":"Murazik",
        "text":"Here you go!"
      }
    ]
  },
  {
    "id":4,
    "student":{
      "id":5,
      "first_name":"Christelle",
      "last_name":"Hartmann"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":4,
      "components":[
        {
          "title":"Arteries",
          "id":10,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":11,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":12,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":4,
        "author_first_name":"Christelle",
        "author_last_name":"Hartmann",
        "text":"I heart this project."
      }
    ]
  },
  {
    "id":5,
    "student":{
      "id":6,
      "first_name":"Ismael",
      "last_name":"Crist"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":5,
      "components":[
        {
          "title":"Arteries",
          "id":13,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":14,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":15,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":5,
        "author_first_name":"Ismael",
        "author_last_name":"Crist",
        "text":"I heart this project."
      }
    ]
  },
  {
    "id":6,
    "student":{
      "id":7,
      "first_name":"Lew",
      "last_name":"Will"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":6,
      "components":[
        {
          "title":"Arteries",
          "id":16,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":17,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":18,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":6,
        "author_first_name":"Lew",
        "author_last_name":"Will",
        "text":"I heart this project."
      }
    ]
  },
  {
    "id":7,
    "student":{
      "id":8,
      "first_name":"Raegan",
      "last_name":"O'Hara"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":7,
      "components":[
        {
          "title":"Arteries",
          "id":19,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":20,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":21,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":7,
        "author_first_name":"Raegan",
        "author_last_name":"O'Hara",
        "text":"Hope this is right! :)"
      }
    ]
  },
  {
    "id":8,
    "student":{
      "id":9,
      "first_name":"Pietro",
      "last_name":"Thiel"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":8,
      "components":[
        {
          "title":"Arteries",
          "id":22,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":23,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":24,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":8,
        "author_first_name":"Pietro",
        "author_last_name":"Thiel",
        "text":"That was easy! Can I do another project?"
      }
    ]
  },
  {
    "id":9,
    "student":{
      "id":10,
      "first_name":"Eula",
      "last_name":"Lowe"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":9,
      "components":[
        {
          "title":"Arteries",
          "id":25,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":26,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":27,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":9,
        "author_first_name":"Eula",
        "author_last_name":"Lowe",
        "text":"Hey this is what I have so far. Is this ok?"
      }
    ]
  },
  {
    "id":10,
    "student":{
      "id":11,
      "first_name":"Margarett",
      "last_name":"Veum"
    },
    "rubric":{
      "title":"Heart Diagram Rubric",
      "id":10,
      "components":[
        {
          "title":"Arteries",
          "id":28,
          "below_description":"Arteries are not present or barely present",
          "approaching_description":"Arteries are present, but may be connected incorrectly",
          "meets_description":"Arteries are present and connected correctly",
          "exceeds_description":"Arteries are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Veins",
          "id":29,
          "below_description":"Veins are not present or barely present",
          "approaching_description":"Veins are present, but may be connected incorrectly",
          "meets_description":"Veins are present and connected correctly",
          "exceeds_description":"Veins are connected correctly, and presented in a clear way that's easy to understand.",
          "points":null
        },
        {
          "title":"Scientific Understanding",
          "id":30,
          "below_description":"Student does not demonstrate strong understanding of the material.",
          "approaching_description":"Student is approaching mastery of the material, but still lacks some key understandings",
          "meets_description":"Student has mastered the material",
          "exceeds_description":"Student has exceeded expected mastery of the material.",
          "points":null
        }
      ]
    },
    "comments":[
      {
        "id":10,
        "author_first_name":"Margarett",
        "author_last_name":"Veum",
        "text":"I heart this project."
      }
    ]
  }
]
