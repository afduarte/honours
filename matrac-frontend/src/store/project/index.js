import qs from 'qs';
import { api } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      projectList: [],
    };
  },
  mutations: {
    setProjectList(state, list) {
      state.projectList = list;
    },
  },
  actions: {
    async fetchProjects({ dispatch, commit }) {
      dispatch('app/loading', true, { root: true });
      try {
        const { data } = await api.get('/session/list');
        commit('setProjectList', data);
      } catch (_) {
        dispatch('app/error', { message: 'Could not fetch projects' }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
    async newProject({ dispatch }, { name = 'Untitled Project', tags = '' }) {
      dispatch('app/loading', true, { root: true });
      try {
        await api.post('/session/new', qs.stringify({ name, tags }));
        await dispatch('fetchProjects');
      } catch (_) {
        dispatch('app/error', { message: 'Could not create projects' }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
  },
  getters: {},
};
