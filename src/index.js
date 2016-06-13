/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Root from 'containers/Root'

import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory, hashHistory } from 'react-router'

import configureStore from 'redux/configureStore'

import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from 'routes/index';

// inject tap event system
injectTapEventPlugin();

const store = configureStore();

// custom histories

/*
const cusHistory = useRouterHistory(createHistory)({
  queryKey: false,
})
*/

// 暂时使用hash，不需要服务端做修改。
const history = syncHistoryWithStore(hashHistory, store);

/*
history.listen(a => {
  console.log(a);
});
*/

ReactDOM.render(
  <Root store={store} history={history} routes={routes()} />,
  document.querySelector('#root')
)
