/**
 * Created by lixiaoxi on 16/7/4.
 * @description
 */

import { getProductDetail } from 'api';


const GET_PRODUCT_DETAIL_BEGIN = 'GET_PRODUCT_DETAIL_BEGIN';
const GET_PRODUCT_DETAIL_SUCCESS = 'GET_PRODUCT_DETAIL_SUCCESS';
const GET_PRODUCT_DETAIL_ERROR = 'GET_PRODUCT_DETAIL_ERROR';

const originState = {
  data: {}
};

// action
function getProductDetailBegin() {
  return {
    type: GET_PRODUCT_DETAIL_BEGIN,
  }
}

function getProductDetailSuccess(res) {
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
    return getProductDetail(id).then((res) => {
      dispatch(getProductDetailSuccess(res));
    }, (err) => {
      dispatch(getProductDetailError(err));
    })
  };
}


//reducer
export default function productDetail(state = originState, action) {
console.log(action, '-------');
  return {...state, data: action.res || {}};
}



