<template lang="pug">
  .user-list
    .user.header
      p Pin
      p Role
    .user(v-for="u in users", @click="$emit('user-click',u)")
      p {{u.Pin}}
      p {{u.Role}}
</template>
<script>
export default {
  name: 'user-list',
  props: {
    users: { type: Array },
  },
};
</script>
<style lang="scss" scoped>
.user-list {
  display: flex;
  flex-direction: column;
  .user {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
