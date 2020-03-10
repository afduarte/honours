<template lang="pug">
  .wizard
    p Welcome to the project wizard
    p Current Step: {{$router.currentRoute.name}}
    template(v-if="showStart")
      p This wizard will guide you through the creation of an annotation project.
        | The steps are easy:
      ol
        li Create a project, and associate with it the tags you will want to classify your data as.
        li Upload a new dataset or associate your project with a previously uploaded one.
        li Select a set of users that can annotate your project.
        li Select the type of annotation task from the growing list of predefined types.
        li ...
        li That's it...
      router-link.start(to="/admin/project-wizard/create-project") Start
    template(v-else)
      router-view
</template>
<script>
export default {
  name: 'ProjectWizard',
  data() {
    return {
      showStart: this.$router.currentRoute.path.replace(/\/$/, '') === '/admin/project-wizard',
    };
  },
  watch: {
    $route(to) {
      this.showStart = to.path.replace(/\/$/, '') === '/admin/project-wizard';
    },
  },
};
</script>
<style lang="scss" scoped>
a.start {
  font-weight: bold;
  color: #3f247a;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background-color: #d6d6d6;

  &.router-link-exact-active {
    color: #d583e9;
  }
}
</style>
