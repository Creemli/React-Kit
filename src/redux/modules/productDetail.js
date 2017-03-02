/**
 * Created by lixiaoxi on 16/7/4.
 * @description
 */

import { getProductDetail } from '../../api';


const GET_PRODUCT_DETAIL_BEGIN = 'GET_PRODUCT_DETAIL_BEGIN';
const GET_PRODUCT_DETAIL_SUCCESS = 'GET_PRODUCT_DETAIL_SUCCESS';
const GET_PRODUCT_DETAIL_ERROR = 'GET_PRODUCT_DETAIL_ERROR';


// hook 通用方法定义
const COMMON_HANDLERS = {
  login() {
    // got to login
  },
  register() {
    // go to register
  }
}



const originState = {
  data: {}
};

// action
function getProductDetailBegin() {
  return {
    type: GET_PRODUCT_DETAIL_BEGIN,
  }
}

export function getProductDetailSuccess(res) {
  return {
    type: GET_PRODUCT_DETAIL_BEGIN,
    res
  }
}

function getProductDetailError() {
  return {
    type: GET_PRODUCT_DETAIL_BEGIN,
  }
}



export function getDetail(id) {
  return (dispatch, getState) => {

    dispatch(getProductDetailBegin());

    const handlers = {
      ...COMMON_HANDLERS,
      success: (res)=> dispatch(getProductDetailSuccess(res)),
      fail: (err)=> dispatch(getProductDetailError(err)),

      // 自定义的针对于回调的处理方法, 这个key会用在ApiList.js 中的配置
      customerHandler: () => {
        //dosomething
      }
    };

    return getProductDetail(id).then(({res, type}) => {
       handlers[type] && handlers[type](res);
    }, (err) => {
      handlers['fail'] && handlers['fail'](err);
    });
  };
}


//reducer
export default function productDetail(state = originState, action) {
  return {...state, data: action.res || ''};
}



