import Vue from 'vue';
import Router from 'vue-router';

import Login from './pages/login/login.vue';
import Admin from './layout/admin/admin.vue';
import IndexAdmin from './pages/admin/index/index.vue';


Vue.use(Router);

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: 'admin',
    component: Admin,
    child: [
      {
        path: '/index',
        name: 'admin_index',
        component: IndexAdmin,
      },
    ],
  },

];
