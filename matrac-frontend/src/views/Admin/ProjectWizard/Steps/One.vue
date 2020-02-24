<template lang="pug">
  project-form(@submit="sendForm")
</template>
<script>
import { mapActions } from 'vuex';
import ProjectForm from '@/components/ProjectForm.vue';

export default {
  components: { ProjectForm },
  methods: {
    ...mapActions('project', ['newProject']),
    async sendForm(project) {
      await this.newProject(project);
      this.$router.push('/admin/project-wizard/link-dataset');
    },
  },
};
</script>
