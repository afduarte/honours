import { timer } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      sidebarL: true,
      sidebarR: true,
      error: '',
    };
  },
  mutations: {
    loading(state, value) {
      state.loading = value;
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
    async error({ commit }, { message = 'There seems to be a problem 😫', timeout = 3000 }) {
      commit('setError', message);
      await timer(timeout);
      commit('setError', '');
    },
    loading({ commit }, value) {
      commit('loading', value);
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
  },
};
