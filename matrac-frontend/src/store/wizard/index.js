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
    setDatse(state, value) {
      state.dataset = value;
    },
  },
  actions: {
    setProject({ commit }, project) {
      commit('setProject', project);
    },
  },
  getters: {
    activeProject(state) {
      return state.project;
    },
  },
};
