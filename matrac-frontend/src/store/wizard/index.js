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
      commit('setProject', project.Name);
    },
    setActiveDataset({ commit }, dataset) {
      commit('setDataset', dataset.ID);
    },
  },
  getters: {
    activeProject(state, getters, rootState) {
      return rootState.project.projectList.find(p => p.Name === state.project);
    },
    activeDataset(state, getters, rootState) {
      return rootState.dataset.datasetList.find(d => d.ID === state.dataset);
    },
  },
};
