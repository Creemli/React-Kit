/**
 * TODO:  待确认是否需要定义此公用reducer
 */

import api from 'api';

// actions
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

// action creators
export function requestPosts (apiType) {
  return {
    type: REQUEST_POSTS,
    apiType: apiType
  }
}
export function receivePosts (apiType, json) {
  return {
    type: RECEIVE_POSTS,
    apiType: apiType,
    res: json
  }
}

export const RECEIVE_ERR = 'RECEIVE_ERR'
export function receiveErr (apiType, errMsg) {
  return {
    type: RECEIVE_ERR,
    apiType: apiType,
    errMsg: errMsg
  }
}

export const CLEAR_ERR = 'CLEAR_ERR'
export function clearErr (apiType) {
  return {
    type: CLEAR_ERR,
    apiType: apiType
  }
}

export const CLEAR_POSTS = 'CLEAR_POSTS'
export function clearPosts (apiType) {
  return {
    type: CLEAR_POSTS,
    apiType: apiType
  }
}

export const CLEAR_FETCHING = 'CLEAR_FETCHING'
export function clearFetching (apiType) {
  return {
    type: CLEAR_FETCHING,
    apiType: apiType
  }
}

// reducer
export default function asyncRequest (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, {[action.apiType]: {
        isFetching: false,
        result: action.res
      }})
    case REQUEST_POSTS:
      return Object.assign({}, state, {[action.apiType]: {
        isFetching: true,
        result: {}
      }})
    case RECEIVE_ERR:
      return Object.assign({}, state, {[action.apiType]: {
        isFetching: false,
        result: {},
        error: true,
        errMsg: action.errMsg
      }})
    case CLEAR_POSTS:
      return Object.assign({}, state, {[action.apiType]: {
        isFetching: false,
        result: {}
      }})
    case CLEAR_FETCHING:
      const foo = Object.assign({}, state[action.apiType], {
        isFetching: false
      })
      return Object.assign({}, state, {[action.apiType]: foo})
    case CLEAR_ERR:
      return Object.assign({}, state, {[action.apiType]: {
        isFetching: false,
        result: {}
      }})
    default:
      return state
  }
}

export function fetchPost (apiType, req) {
  return function (dispatch) {
    dispatch(requestPosts(apiType))
    return api(apiType, req)
      .then((json) =>
        dispatch(receivePosts(apiType, json))
      ).catch((err) => {
        dispatch(receiveErr(apiType, err.message))
        setTimeout(() => {
          dispatch(clearErr(apiType))
        }, 5000)
      })
  }
}
