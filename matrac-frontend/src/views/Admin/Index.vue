<template lang="pug">
  .admin
    square-btn(text="Manage Users", icon="users",@click="$router.push('/admin/manage-users')")
    square-btn(text="Manage Projects", icon="cog",@click="$router.push('/admin/manage-projects')")
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
