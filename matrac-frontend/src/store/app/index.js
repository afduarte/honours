import { ls, api, timer } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      user: {},
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
  },
  actions: {
    async login({ commit }, pin) {
      try {
        commit('loading', true);
        const { data } = await api.post('/user/login', new URLSearchParams(`pin=${pin}`));
        commit('setUser', data);
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
  },
};
