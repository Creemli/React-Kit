/**
 * Created by lixiaoxi on 16/6/7.
 * @description
 */

import React from 'react';
import { Route } from 'react-router-dom';
import CoreLayout from '../layouts/CoreLayout';
import Test from 'views/Test';
import Hello from 'bundle-loader?lazy!views/Hello';

// lazy load
function lazyLoadComponent(lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module.default));
  }
}

// const loadContainerAsync = bundle => (location, cb) => {
//   bundle(component => {
//     cb(null, component)
//   })
// }


const cusProps = {
  onEnter() {
    // do nothing? or setTimeout scrollTo
    const pos = this[this.path];
    setTimeout(() => {
      pos && window.scrollTo(0, pos.top);
    }, 0);
  },

  onLeave() {
    // record the position when leave
    const $page = document.querySelector('.page-container');
    const pos = $page && $page.getBoundingClientRect();
    this[this.path] = {
      top: pos ? (-pos.top - 100) : 0
    };
  }
};

// export default () => (
//   <CoreLayout>
//     <Route path='/hello' getComponent={lazyLoadComponent(Hello)} title="Nothing" />
//   </CoreLayout>
   
// )

export default [
  { component: CoreLayout,
    routes: [
      { path: '/',
        exact: true,
        component: Test
      },
      {
        path: '/hello',
        getComponent: lazyLoadComponent(Hello),
      }
    ]
  }
];