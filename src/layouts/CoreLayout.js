/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import React, { PropTypes, Component } from 'react';

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <div className="page-container">
        <div className="view-container">{this.props.children}</div>
      </div>
    );
  }
}

export default CoreLayout;

