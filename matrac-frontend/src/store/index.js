import Vue from 'vue';
import Vuex from 'vuex';
import { ls } from '@/utils';
import app from './app';
import user from './user';
import project from './project';
import dataset from './dataset';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    async initialise({ dispatch, getters }) {
      const token = getters['user/getToken'];
      if (token) {
        await dispatch('user/login', token);
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
    user,
    project,
    dataset,
  },
});
