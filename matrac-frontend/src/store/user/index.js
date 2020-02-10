import qs from 'qs';
import { ls, api } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      user: {},
      userList: [],
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserList(state, list) {
      state.userList = list;
    },
  },
  actions: {
    async login({ dispatch, commit }, pin) {
      try {
        dispatch('app/loading', true, { root: true });
        const { data } = await api.post('/user/login', qs.stringify({ pin }));
        if (!data.Pin || !data.Role) {
          throw new Error('Invalid login');
        }
        commit('setUser', data);
        ls.setItem('token', data.Pin);
      } catch (_) {
        commit('setUser', {});
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
    async fetchUsers({ dispatch, commit }) {
      dispatch('app/loading', true, { root: true });
      try {
        const { data } = await api.get('/user/list');
        commit('setUserList', data);
      } catch (_) {
        dispatch('app/error', { message: 'Could not fetch users' }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
    async generateUsers({ dispatch }, howMany = 1) {
      dispatch('app/loading', true, { root: true });
      try {
        await api.post(`/user/new?multiple=${howMany}`);
        await dispatch('fetchUsers');
      } catch (_) {
        dispatch('app/error', { message: 'Could not create users' }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
  },
  getters: {
    userLoggedIn(state) {
      return state.user && state.user.Pin && state.user.Role;
    },
    getToken() {
      const token = ls.getItem('token');
      if (token) {
        return token;
      }
      return '';
    },
  },
};
