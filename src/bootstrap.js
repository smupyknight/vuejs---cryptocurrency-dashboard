/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */


/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';


/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios';
// eslint-disable-next-line
//  import authService from './app/services/auth';
const logoutErrors = [
  40102, // No token provided
  40103, // Invalid token
];

Axios.defaults.baseURL = process.env.API_LOCATION;
Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
    response => response,
    (error) => {
        /**
         * If response is unauthorized and it is not a request retry from auth service.
         */
      if (error.response.status === 401 && error.response.request.responseURL.indexOf('retry=1') === -1) {
        const errorCode = error.response.data.error.code;
          /**
           * If error should log user out.
           */
        if (logoutErrors.indexOf(errorCode) >= 0) {
          //  authService.logout();
          return Promise.reject(error);
        }

          /**
          * If token is expired, try to refresh it and retry failed ajax.
          */
        if (errorCode === 40104) {
         // return authService.token.getRefreshedToken(error.response);
        }

          /**
          * if email is no verified.
          */
        if (errorCode === 40113) {
          Vue.router.push({
            name: 'dashboard',
          });
        }

        /**
        * If user does not have module.
        */
        if (errorCode === 40112) {
          Vue.router.push({
            name: 'dashboard',
          });
        }
      }
      return Promise.reject(error);
    });
Axios.interceptors.request.use((config) => {
  if (localStorage.getItem('id_token')) {
        // eslint-disable-next-line
        config.headers.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
  }
  return config;
}, error => Promise.reject(error));
Vue.$http = Axios;

/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Require the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */
// require('./assets/stylus/base.styl');

/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
// eslint-disable-next-line
import VuexRouterSync from 'vuex-router-sync';
// eslint-disable-next-line
import store from './app/store';

// store.dispatch('checkAuthentication');


/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
// eslint-disable-next-line
import VueRouter from 'vue-router';
// eslint-disable-next-line
import routes from './app/routes';
// eslint-disable-next-line
import routeMidlleware from './app/route-middleware';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
});

router.beforeEach(routeMidlleware.beforeEach);

VuexRouterSync.sync(store, router);

Vue.router = router;

/* ============
 * Element User Interface
 * ============
 *
 * Vue.js UI components.
 *
 * http://element.eleme.io/#/en-US
 */
// eslint-disable-next-line
import ElementUI from 'element-ui';

Vue.use(ElementUI);

export default {
  router,
};
