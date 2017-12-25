import Vue from 'vue';
import { LOGOUT, CHECK_AUTHENTICATION, LOGIN, UPDATE_REFRESHING } from './../../mutation-types';

export default {
  [CHECK_AUTHENTICATION](state) {
    state.authenticated = !!localStorage.getItem('id_token');
  },

  [LOGIN](state, token) {
    state.authenticated = true;
    localStorage.setItem('id_token', token);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  [LOGOUT](state) {
    state.authenticated = false;
    localStorage.removeItem('id_token');

    if (localStorage.getItem('is_admin')) {
      localStorage.removeItem('is_admin');
    }

    Vue.$http.defaults.headers.common.Authorization = '';
  },

  [UPDATE_REFRESHING](state, value) {
    state.refreshing = value;
  },
};
