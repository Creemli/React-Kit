/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import CoreLayout from '../layouts/CoreLayout';

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.element,
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <CoreLayout>
          <BrowserRouter>
          {this.props.routes}
          </BrowserRouter>
        </CoreLayout>
      </Provider>
    );
  }
}

