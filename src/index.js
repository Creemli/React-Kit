/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'

import configureStore from './redux/configureStore'

import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from 'routes/index';

// inject tap event system
// iOS 9.3 以上 可以移除此插件
injectTapEventPlugin();

const store = configureStore();

ReactDOM.render(
  <Root store={store} routes={routes()} />,
  document.querySelector('#root')
)
