<template lang="pug">
  .wizard
    p Welcome to the project wizard
    p Current View: {{$router.currentRoute.name}}
    template(v-if="showStart")
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
.start {

}
</style>
