import Vue from 'vue';
import Vuex from 'vuex';

import app from './app';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    async initialise({ dispatch, getters }) {
      if (getters['app/getToken']) {
        await dispatch('app/login');
      }
    },
  },
  modules: {
    app,
  },
});
