/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'styles/test.less';
import 'styles/core.css';

@connect((state) => ({
  data: state.data
}), () => {
  return {};
})

class Test extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  goTo() {
    this.context.router.push('hello')
  }

  render() {
    return (<div className="test" onTouchTap={::this.goTo}>Hello World!
      <div className="styleCore">测试</div>
    </div>);
  }

  componentDidMount() {
  }
}

export default Test;


