/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from './rootReducer';


const logger = createLogger({ collapsed: true });


export default function configureStore(initialState = {}, history) {
  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger,
    routerMiddleware(history)
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
