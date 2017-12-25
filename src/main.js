// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

// // eslint-disable-next-line
// import 'element-ui/lib/theme-default/index.css';
//
// // eslint-disable-next-line
// import ElementUI from 'element-ui';
//
// Vue.use(ElementUI);

require('./bootstrap');

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue(App).$mount('#app');

