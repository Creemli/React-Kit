/**
 * Created by lixiaoxi on 16/7/4.
 * @description  定义项目中用到的所有API列表
 */

import Api from './lib/ApiBase';
import ApiList, { handleCallback } from './ApiList';


const hookCallback = (res) => {
  return (name) => ({res, type: handleCallback(name, res.responseCode)})
};




// ProductDetailInfo

export function getProductDetail(productId, productCode) {
  return Api(ApiList.PRODUCT_DETAIL, {
    productId,
    productCode,
  })
  .then((res) => hookCallback(res)(ApiList.PRODUCT_DETAIL));
}
