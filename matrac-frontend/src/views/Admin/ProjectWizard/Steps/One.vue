<template lang="pug">
  .create-project
    instructions
      p To add a new project, first give it a name.
      p It will be used to identify the project across the system.
        |  It is visible by administrators and annotators
      p Once your project has a name, start adding classes.
        |  Classes are the labels with which you want to annotate data items as.
      p The lower the number of classes the easier it is to annotate data.
        |  Therefore, it might be better to create multiple projects with binary classes
        |  than a single project with all the classes.
      p For example: If you have a set of data that should be tagged as one of:
      p
        span.colour.red Red
        span.colour.green Green
        span.colour.blue Blue
      p it might be faster for annotators if you have 3 projects tagged as:
      p
        span.colour.red Red
        span.colour Not Red
      p
        span.colour.green Green
        span.colour Not Green
      p
        span.colour.blue Blue
        span.colour Not Blue
    project-form(@submit="sendForm")
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ProjectForm from '@/components/ProjectForm.vue';
import Instructions from '@/components/Instructions.vue';

export default {
  components: { ProjectForm, Instructions },
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
      this.nextStep(project.name);
    },
    nextStep(p) {
      this.$router.push(`/admin/project-wizard/link-dataset/${encodeURIComponent(p)}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.nav{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
span.colour{
  border: 3px solid #585858;
  color: #585858;
  padding: 3px;
  margin-left: 10px;
  font-weight: bolder;
  background-color: #ffffff;
  border-radius: 3px;
  &.red{
    border-color: #ff5858;
  }
  &.green{
    border-color: #58ff58;
  }
  &.blue{
    border-color: #5858ff;
  }
}
</style>
