<template lang="pug">
  project-form(@submit="sendForm")
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ProjectForm from '@/components/ProjectForm.vue';

export default {
  components: { ProjectForm },
  computed: {
    ...mapState('project', ['projectList']),
  },
  methods: {
    ...mapActions('project', ['newProject', 'fetchProjects']),
    ...mapActions('wizard', ['setActiveProject']),
    async sendForm(project) {
      await this.newProject(project);
      await this.fetchProjects();
      const np = this.projectList.find(p => p.Name === project.name);
      await this.setActiveProject(np);
      this.$router.push('/admin/project-wizard/link-dataset');
    },
  },
};
</script>
