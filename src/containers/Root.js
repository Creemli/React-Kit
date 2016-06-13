/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  }

  get content() {
    return (<Router history={this.props.history}>
      {this.props.routes}
    </Router>);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>{this.content}</div>
      </Provider>
    );
  }
}

