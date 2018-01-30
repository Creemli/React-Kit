/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div className="page-container">
        <div className="view-container">
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default CoreLayout;

