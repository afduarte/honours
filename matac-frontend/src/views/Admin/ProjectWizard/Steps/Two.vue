<template lang="pug">
  .manage-datasets
    template(v-if="answer === 'new'")
      instructions
        p To add a new dataset, first give it a name.
          |  It will be used to identify the dataset across the system.
        p Then select the file that holds the data you want to upload.
          |  Currently the supported formats are: csv, tsv, jsonl.
        p Once a file is selected you have to select up to 3 fields from the dataset
        ol
          li Unique ID: If there is a unique field in the dataset
            |  it will be used to store each data item. If there isn't one,
            |  the system will randomly generate one.
          li Annotation target: The field in the dataset that you want annotators to annotate.
            |  This is a required field and you will not be able to proceed until one is selected.
          li Context field: Optionally you can select a
            |  3rd field to be used as context for the annotators. This field will be shown to
            |  annotators alongside the annotation target to help them make a decision
      dataset-form(:existing="datasetList", @submit="createDataset")
      .nav
        button(@click="prevStep") Previous
        button(@click="linkDataset", :disabled="!selectedDataset") Next
    template(v-else-if="answer === 'existing'")
      dataset-list(
        :datasets="datasetList",
        :active="selectedDataset",
        @dataset-click="selectedDataset = selectedDataset === $event? null :$event")
      .nav
        button(@click="prevStep") Previous
        button(@click="linkDataset", :disabled="!selectedDataset") Next

    template(v-else)
      p You need to associate a dataset with your data project.
      p Add a new one or associate a previously uploaded dataset.
      .options
        button(@click="answer = 'new'") Create New Dataset
        button(@click="answer = 'existing'") Select Existing Dataset ({{datasetList.length}})
      .nav
        button(@click="prevStep") Previous
        button(@click="linkDataset", :disabled="true") Next

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import DatasetList from '@/components/DatasetList.vue';
import DatasetForm from '@/components/DatasetForm.vue';
import Instructions from '@/components/Instructions.vue';

export default {
  components: { DatasetList, DatasetForm, Instructions },
  name: 'LinkDataset',
  props: ['project'],
  data() {
    return {
      selectedDataset: null,
      answer: null,
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
    ...mapState('dataset', ['datasetList']),
    ...mapGetters('wizard', ['activeDataset', 'activeProject']),
  },
  methods: {
    ...mapActions('dataset', ['fetchDatasets', 'newDataset']),
    ...mapActions('project', ['mapDatasetToProject']),
    ...mapActions('wizard', ['setActiveDataset', 'setActiveProject']),
    ...mapActions('app', ['error']),
    async createDataset(dataset) {
      await this.newDataset(dataset);
      await this.fetchDatasets();
      const nd = this.datasetList.find(d => d.Name === dataset.name);
      await this.setActiveDataset(nd);
      this.selectedDataset = nd;
      await this.mapDataset();
      this.answer = 'existing';
    },
    async linkDataset() {
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
      this.$router.push(`/admin/project-wizard/link-users/${encodeURIComponent(this.project)}`);
    },
    prevStep() {
      this.$router.push('/admin/project-wizard/create-project');
    },
  },
  async mounted() {
    const pr = this.projectList.find(p => p.Name === this.project);
    await this.setActiveProject(pr);
    await this.fetchDatasets();
    if (!this.datasetList.length) {
      this.answer = 'new';
    }
  },
};
</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.manage-datasets {
  display: flex;
  flex-direction: column;
  .options{
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      padding: 60px;
      font-size: 1.3em;
      margin: 20px;
    }
  }
}
</style>
