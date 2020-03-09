import { api } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      utteranceList: [],
      current: 0,
    };
  },
  mutations: {
    setUtteranceList(state, list) {
      state.utteranceList = list;
    },
    incrementUtterance(state) {
      state.current += 1;
    },
  },
  actions: {
    async fetchUtterances({ dispatch, commit }, project) {
      dispatch('app/loading', true, { root: true });
      try {
        const { data } = await api.get(`/utterances/get/${encodeURIComponent(project)}`);
        commit('setUtteranceList', data);
      } catch (_) {
        dispatch('app/error', { message: `Could not fetch utterances for project ${project}` }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
    submitUtterance({ commit }) {
      commit('incrementUtterance');
    },
  },
  getters: {},
};
