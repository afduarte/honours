<template lang="pug">
  .admin
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

</style>
