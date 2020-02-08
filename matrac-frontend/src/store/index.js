import Vue from 'vue';
import Vuex from 'vuex';
import { ls } from '@/utils';
import app from './app';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    async initialise({ dispatch, getters }) {
      if (getters['app/getToken']) {
        await dispatch('app/login');
      } else {
        const urlToken = new URLSearchParams(window.location.search).get('pin');
        if (urlToken) {
          ls.setItem('token', urlToken);
          window.location.search = '';
          window.location.replace('/');
        }
      }
    },
  },
  modules: {
    app,
  },
});
