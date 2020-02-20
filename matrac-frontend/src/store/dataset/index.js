import qs from 'qs';
import { api } from '../../utils';

export default {
  namespaced: true,
  state() {
    return {
      datasetList: [],
    };
  },
  mutations: {
    setDatasetList(state, list) {
      state.datasetList = list;
    },
  },
  actions: {
    async fetchDatasets({ dispatch, commit }) {
      dispatch('app/loading', true, { root: true });
      try {
        const { data } = await api.get('/dataset/list');
        commit('setDatasetList', data);
      } catch (_) {
        dispatch('app/error', { message: 'Could not fetch dataset' }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
    async newDataset({ dispatch }, {
      name = 'New Dataset',
      type = 'csv',
      idIdx = '',
      userIdx = '',
      responseIdx = '',
    }) {
      dispatch('app/loading', true, { root: true });
      try {
        const body = qs.stringify({
          name, type, idIdx, userIdx, responseIdx,
        });
        await api.post('/dataset/new', body);
        await dispatch('fetchDatasets');
      } catch (_) {
        dispatch('app/error', { message: 'Could not create dataset' }, { root: true });
      } finally {
        dispatch('app/loading', false, { root: true });
      }
    },
  },
  getters: {},
};
