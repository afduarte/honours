<template lang="pug">
  .manage-datasets
    dataset-list(
      :datasets="datasetList",
      :active="activeDataset",
      @dataset-click="activeDataset = activeDataset === $event? null :$event")

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
  display: flex;
  flex-direction: column;
}
</style>
