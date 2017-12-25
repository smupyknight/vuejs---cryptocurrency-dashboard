/* ============
 * Vuex Getters
 * ============
 *
 * All the getters that can be used
 * inside the store
 */

// Auth

const isAuthenticated = state => state.auth.authenticated;
export { isAuthenticated as default };
