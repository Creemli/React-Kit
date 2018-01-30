/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDetail } from '../redux/modules/productDetail';

@connect((state) => ({productDetail: state.productDetail}),
 (dispatch) => bindActionCreators({ getDetail }, dispatch))

class Hello extends Component {

  componentDidMount() {
    this.props.getDetail(123);
  }

  render() {
    return (<div>Hello routerReducer!!{JSON.stringify(this.props.productDetail.data)}</div>);
  }
}

export default Hello;
