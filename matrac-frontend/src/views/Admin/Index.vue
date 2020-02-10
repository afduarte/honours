<template lang="pug">
  .admin
    square-btn(text="Create Users", icon="users",@click="$router.push('/admin/manage-users')")
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
