<template lang="pug">
  .manage-projects
    .project-list
      template(v-for="(p, i) in projectList")
        .project
          p ID: {{p.Name}}
          p Creator: {{p.CreatorID}}
          p Created: {{p.Created}}
          p Tags: {{p.Options}}
          .file
            template(v-if="upload === i")
              vue-dropzone(id="datasetUpload",:options="dzOpts", @vdropzone-sending="sendingEvent")
            template(v-else)
              button(@click="upload = i") Add Dataset

    .manage
      .new-project
        h3 Add Project
        p Name
        input(type="text", v-model="name")
        p Tags (comma separated)
        input(type="text", v-model="tags")
        button(type="submit", @click.prevent="sendForm") Submit
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  components: { vueDropzone: vue2Dropzone },
  name: 'ManageProjects',
  data() {
    return {
      name: '',
      tags: '',
      upload: null,
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
    ...mapGetters('user', ['getToken']),
    dzOpts() {
      return {
        url: '/api/dataset/file/new',
        thumbnailWidth: 150,
        headers: { Authorization: `Bearer ${this.getToken}` },
      };
    },
  },
  methods: {
    ...mapActions('project', ['fetchProjects', 'newProject']),
    ...mapActions('app', ['error']),
    sendingEvent(file, xhr, formData) {
      formData.append('datasetID', this.projectList[this.upload].Name);
    },
    async sendForm() {
      await this.newProject({ name: this.name, tags: this.tags });
      this.name = '';
      this.tags = '';
    },
  },
  async mounted() {
    await this.fetchProjects();
  },
};
</script>

<style lang="scss" scoped>
.manage-projects {
  display: flex;
  flex-direction: column;
  .project-list,
  .manage {
    flex-grow: 1;
  }
  .project-list {
    display: flex;
    flex-direction: column;
    .project {
      display: flex;
      flex-direction: row;
      justify-content:space-around;
    }
  }
}
</style>
