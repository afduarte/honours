<template lang="pug">
  .manage-projects
    h1 Manage Projects
    .content
      .project-list
        project-list(:projects="projectList",
          :active="activeProject",
          @project-click="activeProject = activeProject === $event? null :$event")

        template(v-if="activeProject")
          .dataset-link
            h2 Link Dataset to Project
            template(v-for="(d, i) in datasetList")
              .dataset(@click="linkDataset(d, activeProject)")
                p Name: {{d.Name}}
            router-link(to="/admin/manage-datasets") Add New

      .manage
        project-form(@submit="sendForm")
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ProjectList from '@/components/ProjectList.vue';
import ProjectForm from '@/components/ProjectForm.vue';

export default {
  components: { ProjectList, ProjectForm },
  name: 'ManageProjects',
  data() {
    return {
      upload: null,
      activeProject: null,
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
    ...mapState('dataset', ['datasetList']),
    ...mapGetters('user', ['getToken']),
  },
  methods: {
    ...mapActions('project', ['fetchProjects', 'newProject', 'mapDatasetToProject']),
    ...mapActions('dataset', ['fetchDatasets']),
    ...mapActions('app', ['error']),
    async sendForm({ name, tags }) {
      await this.newProject({ name, tags });
    },
    async linkDataset(dataset, project) {
      await this.mapDatasetToProject({ project: project.Name, dataset: dataset.ID });
      this.activeProject = null;
    },
  },
  async mounted() {
    await Promise.all([
      this.fetchProjects(),
      this.fetchDatasets(),
    ]);
  },
};
</script>

<style lang="scss" scoped>
.manage-projects {
  text-align: center;
  margin-top: 60px;
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
