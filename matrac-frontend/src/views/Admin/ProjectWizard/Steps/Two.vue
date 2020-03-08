<template lang="pug">
  .manage-datasets
    p Associate an existing dataset
    dataset-list(
      :datasets="datasetList",
      :active="selectedDataset",
      @dataset-click="selectedDataset = selectedDataset === $event? null :$event")
    button(@click="linkExistingDataset", :disabled="!selectedDataset") Link dataset

    p Or create a new one
    dataset-form(:existing="datasetList", @submit="createDataset")
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import DatasetList from '@/components/DatasetList.vue';
import DatasetForm from '@/components/DatasetForm.vue';

export default {
  components: { DatasetList, DatasetForm },
  name: 'LinkDataset',
  data() {
    return {
      selectedDataset: null,
    };
  },
  computed: {
    ...mapState('dataset', ['datasetList']),
    ...mapGetters('wizard', ['activeDataset', 'activeProject']),
  },
  methods: {
    ...mapActions('dataset', ['fetchDatasets', 'newDataset']),
    ...mapActions('project', ['mapDatasetToProject']),
    ...mapActions('wizard', ['setActiveDataset']),
    ...mapActions('app', ['error']),
    async createDataset(dataset) {
      await this.newDataset(dataset);
      await this.fetchDatasets();
      const nd = this.datasetList.find(d => d.Name === dataset.name);
      await this.setActiveDataset(nd);
      this.selectedDataset = nd;
      await this.mapDataset();
      this.nextStep();
    },
    async linkExistingDataset() {
      await this.setActiveDataset(this.selectedDataset);
      await this.mapDataset();
      this.nextStep();
    },
    async mapDataset() {
      await this.mapDatasetToProject({
        project: this.activeProject.Name,
        dataset: this.activeDataset.ID,
      });
    },
    nextStep() {
      this.$router.push('/admin/project-wizard/link-users');
    },
  },
  async mounted() {
    await this.fetchDatasets();
  },
};
</script>

<style lang="scss" scoped>
.manage-datasets {
  display: flex;
  flex-direction: column;
}
</style>
