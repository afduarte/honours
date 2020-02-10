<template lang="pug">
  .manage-users
    .project-list
      template(v-for="p in projectList")
        .user
          p ID: {{p.Name}}
          p Creator: {{p.CreatorID}}
          p Created: {{p.Created}}
          p Tags: {{p.Options}}
    .new-project
      h3 Add Project
      p Name
      input(type="text", v-model="name")
      p Tags (comma separated)
      input(type="text", v-model="tags")
      button(type="submit", @click.prevent="sendForm") Submit
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ManageProjects',
  data() {
    return {
      name: '',
      tags: '',
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
  },
  methods: {
    ...mapActions('project', ['fetchProjects', 'newProject']),
    ...mapActions('app', ['error']),
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
  flex-direction: row;
  .project-list,
  .new-project {
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
