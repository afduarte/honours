export default {
  namespaced: true,
  state() {
    return {
      project: null,
      dataset: null,
    };
  },
  mutations: {
    setProject(state, value) {
      state.project = value;
    },
    setDataset(state, value) {
      state.dataset = value;
    },
  },
  actions: {
    setActiveProject({ commit }, project) {
      commit('setProject', project);
    },
    setActiveDataset({ commit }, dataset) {
      commit('setDataset', dataset);
    },
  },
  getters: {
    activeProject(state) {
      return state.project;
    },
    activeDataset(state) {
      return state.project;
    },
  },
};
