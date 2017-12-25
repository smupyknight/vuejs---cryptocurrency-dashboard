/* ============
 * Vuex Actions
 * ============
 *
 * All the actions that can be used
 * inside the store
 */
import * as types from './mutation-types';

// Auth
export const login = ({ commit }, token) => {
  commit(types.LOGIN, token);
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
};

export const checkAuthentication = ({ commit }) => {
  commit(types.CHECK_AUTHENTICATION);
};
