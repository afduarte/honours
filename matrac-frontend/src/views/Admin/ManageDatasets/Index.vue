<template lang="pug">
  .manage-datasets
    h1 Manage Datasets
    .content
      dataset-list(:datasets="datasetList")
      dataset-form(:existing="datasetList", @submit="sendForm")
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DatasetList from '@/components/DatasetList.vue';
import DatasetForm from '@/components/DatasetForm.vue';

export default {
  components: { DatasetList, DatasetForm },
  name: 'ManageDatasets',
  data() {
    return {
      activeDataset: null,
    };
  },
  computed: {
    ...mapState('dataset', ['datasetList']),
  },
  methods: {
    ...mapActions('dataset', ['fetchDatasets', 'newDataset']),
    ...mapActions('app', ['error']),
    async sendForm(dataset) {
      await this.newDataset(dataset);
    },
  },
  async mounted() {
    await this.fetchDatasets();
  },
};
</script>

<style lang="scss" scoped>
.manage-datasets {
  margin-top: 60px;
  text-align: center;
  display: flex;
  flex-direction: column;
  .content {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 50px;
    padding-left: 5em;
    padding-right: 5em;
  }
}
</style>
