/**
 * Created by lixiaoxi on 16/7/4.
 * @description  定义项目中用到的所有Api 名称, 以及action
 */

const ApiList = {
  PRODUCT_DETAIL: '/product/productDetailInfo.do',
}







/**
 * @author li.xx
 * @param name
 * @param code
 * @returns {*|string}
 *
 * 简单的说明一下此hook的用法, 此方法定义后回使用在Api层, 
 * 获取到返回response之后对response的code进行判断,
 * 然后返回对应的类型。
 *
 * action中调用api的时候需要定义通用的type , 如登录, 服务关闭。
 * 以及每个api的其他类型。
 *
 *
 * 其他情况默认返回fail 类型, 因此action中也需要定义fail方法
 */


//  默认配置, 可以针对不同的项目进行修改
const defaultSettings = {
  '00000': 'success',
  // 5001, 5002 handle
  '7004': 'login',
  '1006': 'login',
  '5001': 'closeService',
  '5002': 'closeService',
};

const configList = {
  // 每个接口的自定义配置(如需)
  [ApiList.PRODUCT_DETAIL]: {
    ...defaultSettings,
    '7006': 'something',
  }
};


// success, error
export function handleCallback(name = '', code = '') {
  


  let list = configList[name];
  if (!list) {
    list = defaultSettings;
  }



  return list[code] || 'fail';
}


export default ApiList;