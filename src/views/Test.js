/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';

@connect((state) => ({
  data: state.data
}), () => {

})

class Test extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  goTo() {
    this.context.router.push('hello')
  }

  render() {
    return (<div onTouchTap={::this.goTo}>Hello World!</div>);
  }

  componentDidMount() {
  }
}

export default Test;


