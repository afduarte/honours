<template lang="pug">
  .admin
    router-link(to="/admin/project-wizard")
      square-btn(text="New Project Wizard", icon="magic")
    router-link(to="/admin/manage-users")
      square-btn(text="Manage Users", icon="users")
    router-link(to="/admin/manage-projects")
      square-btn(text="Manage Projects", icon="cog")
    router-link(to="/admin/manage-datasets")
      square-btn(text="Manage Datasets", icon="archive")
</template>

<script>
import SquareBtn from '@/components/SquareBtn.vue';

export default {
  components: {
    SquareBtn,
  },
  name: 'Admin',
};
</script>

<style lang="scss" scoped>
  .admin {
    margin-top: 100px;
    display: grid;
    grid-gap: 100px;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
  }
</style>
