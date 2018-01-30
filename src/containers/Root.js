/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.array,
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <BrowserRouter>
          {renderRoutes(this.props.routes)}
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

