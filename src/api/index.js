/**
 * Created by lixiaoxi on 16/7/4.
 * @description  定义项目中用到的所有API列表
 */

import Api from './lib/ApiBase';
import ApiList from './ApiList';

// ProductDetailInfo

export function getProductDetail(productId, productCode) {
  return Api(ApiList.PRODUCT_DETAIL, {
    productId,
    productCode
  });
}

