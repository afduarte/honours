import qs from 'qs';
import { ls, api, timer } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      user: {},
      sidebarL: true,
      sidebarR: true,
      error: '',
    };
  },
  mutations: {
    loading(state, value) {
      state.loading = value;
    },
    setUser(state, user) {
      state.user = user;
    },
    setError(state, message) {
      state.error = message;
    },
    setSidebarL(state, val) {
      state.sidebarL = val;
    },
    setSidebarR(state, val) {
      state.sidebarR = val;
    },
  },
  actions: {
    async login({ commit }, pin) {
      try {
        commit('loading', true);
        const { data } = await api.post('/user/login', qs.stringify({ pin }));
        if (!data.Pin || !data.Role) {
          throw new Error('Invalid login');
        }
        commit('setUser', data);
        ls.setItem('token', data.Pin);
      } catch (_) {
        commit('setUser', {});
      } finally {
        commit('loading', false);
      }
    },
    async error({ commit }, { message = 'There seems to be a problem 😫', timeout = 3000 }) {
      commit('setError', message);
      await timer(timeout);
      commit('setError', '');
    },
    toggleSidebar({ commit, state }, side) {
      if (side === 'right') {
        commit('setSidebarR', !state.sidebarR);
      } else {
        commit('setSidebarL', !state.sidebarL);
      }
    },
  },
  getters: {
    getToken() {
      const token = ls.getItem('token');
      if (token) {
        return token;
      }
      return '';
    },
    getUser(state) {
      return state.user;
    },
    userLoggedIn(state) {
      return state.user && state.user.Pin && state.user.Role;
    },
  },
};
