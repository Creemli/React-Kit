/**
 * Created by lixiaoxi on 16/7/4.
 * @description     模拟数据
 */

import Mock from 'mock';

export function ApiMock(action, params, opt) {
  const resData = Mock[action];
  if (resData.responseCode === '00000') {
    return Promise.resolve(resData.responseData);
  } else {
    return Promise.reject(new Error(resData.responseMessage));
  }
}
