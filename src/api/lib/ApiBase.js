/**
 * Created by lixiaoxi on 16/7/4.
 * @description   封装请求,判断是否需要mock。
 *  如果action为 http|(https) 开头的,则表示使用其作为完整url
 */

import Config from '../../config';
import { ApiJsonp, ApiGet, ApiPost } from './ApiLive';

const Domain = Config.baseDomain;
const timeOut = Config.timeOut;

export default (action, params, opt = {}) => {
  let url = action;
  if (!/(http|https):\/\//ig.test(action)) {
    url = Domain + action;
  }

  const options = {...opt, timeout: opt.timeout || timeOut};

  return Config.isMock() ? 
    ApiGet(action, params, options) :
    ApiJsonp(url, params, options).then((res) => res.json());
};
