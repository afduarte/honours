import qs from 'qs';
import { api } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      utteranceList: [],
      history: [],
      project: null,
      current: 0,
      sessionStart: null,
    };
  },
  mutations: {
    setProject(state, project) {
      state.project = project;
    },
    setUtteranceList(state, list) {
      state.utteranceList = list;
    },
    nextUtterance(state) {
      state.utteranceList = state.utteranceList.slice(1);
    },
    addToHistory(state, u) {
      state.history.push(u);
    },
    clearHistory(state) {
      state.history = [];
    },
    setSessionStart(state, val) {
      state.sessionStart = val;
    },
  },
  actions: {
    setProject({ commit }, project) {
      commit('setProject', project);
    },
    async fetchUtterances({ state, dispatch, commit }) {
      if (!state.project) {
        return;
      }
      dispatch('app/loading', true, { root: true });
      try {
        const { data } = await api.get(`/utterance/get/${encodeURIComponent(state.project.Name)}`);
        commit('setUtteranceList', data);
      } catch (_) {
        dispatch('app/error', { message: `Could not fetch utterances for project ${state.project.Name}` }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
    async submitUtterance({ state, commit, dispatch }, {
      tags, utterance, note, project,
    }) {
      dispatch('app/loading', true, { root: true });
      try {
        const body = qs.stringify({ tags, utterance, note });
        await api.post(`/annotation/add/${encodeURIComponent(project)}`, body);
        const fullUtterance = state.utteranceList.find(u => u.ID === utterance);
        commit('addToHistory', { utterance: fullUtterance.Target, tags });
        commit('nextUtterance');
        if (state.utteranceList.length < 1) {
          await dispatch('fetchUtterances');
        }
      } catch (_) {
        dispatch('app/error', { message: `Could not add annotation for project ${project}` }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
    startSession({ commit }) {
      commit('clearHistory');
      commit('setSessionStart', new Date());
    },
  },
  getters: {
    activeProject(state) {
      return state.project;
    },
  },
};
