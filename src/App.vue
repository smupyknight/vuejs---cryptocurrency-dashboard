<style src="./assets/stylus/base.styl" lang="stylus"></style>
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  /* ============
   * Entry Point
   * ============
   *
   * The entry point of the application
   */

  import store from './app/store';
  import { router } from './bootstrap';

  export default {
    data() {
      return {
        loading: false,
      };
    },

    /**
     * The Vuex store
     */
    store,

    /**
     * The router
     */
    router,

    /**
     * Fires when the app has been mounted
     */
    created() {
    },

  };

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
