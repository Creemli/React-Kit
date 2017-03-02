/**
 * Created by lixiaoxi on 2017/3/2.
 * @description
 */

// Create a fake global `window` and `document` object:
import { render } from 'enzyme'

// Replace BigComplicatedComponent.js with a stub component.
global.reactModulesToStub = [
    'Hello.js'
];



import chai, { expect } from 'chai';

import React from 'react';

import configureStore from '../src/redux/configureStore'

import Hello from '../src/views/Hello';
import { getDetail, getProductDetailSuccess } from '../src/redux/modules/productDetail';

// chai.should();

describe('测试创建Store', () => {
    const store = configureStore();

    it('Store类型', () => {
        expect(configureStore).to.be.a('function');
        expect(store).to.be.a('object');
        expect(store).to.include.keys('getState');
        expect(store).to.have.any.keys('getState', 'dispatch')
    })
});

describe('测试Reducer', () => {
    const store = configureStore();

    it('reducer', () => {
        store.dispatch(getProductDetailSuccess('test'));
        const state = store.getState();
        expect(state).to.have.any.keys('productDetail');
        expect(state.productDetail).to.be.a('object');
        expect(state.productDetail.data).to.equal('test');
    })


    it('请求', () => {
        // store.dispatch(getDetail('123'));
        const state = store.getState();
        expect(state.productDetail.data).to.equal('');
    })
})


describe('测试Hello页面', function() {

    let com;
    const store = configureStore();

    before(() => {
        com = render(<Hello  store={store}/>)
    });


    it('测试Hello 页面', function() {
        expect(com.find('div')).to.exist;
        expect(com.find('div').text()).to.equal('Hello routerReducer!!')
    });


    it('测试页面改变', function () {
        store.dispatch(getProductDetailSuccess('测试'));
        // expect(com.find('div').text()).to.equal('Hello routerReducer!!测试')
    })
});

