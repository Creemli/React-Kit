/**
 * Created by lixiaoxi on 16/7/4.
 * @description 网络请求
 */

import reqwest from 'reqwest';

export function ApiGet(url, data = {}, opt = {}) {
  return reqwest({
    url,
    method: 'GET',
    timeout: opt.timeout,
    contentType: 'application/json;charset=utf-8',
    data,
  });
}

export function ApiJsonp(url, data = {}, opt = {}) {
  return reqwest({
    url,
    method: 'GET',
    type: 'jsonp',
    timeout: opt.timeout,
    contentType: 'application/json;charset=utf-8',
    data,
  });
}

export function ApiPost(url, data = {}, opt = {}) {
  return reqwest({
    url: 'path/to/html',
    method: 'post',
    timeout: opt.timeout,
    data,
  });
}
