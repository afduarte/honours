<template lang="pug">
  .user-list
    .user.header
      p Pin
      p Role
      p Selected
    .user(v-for="u in users", @click="$emit('user-click',u)")
      p {{u.Pin | pin}}
      p {{u.Role}}
      p
        fa-icon(v-if="selected.find(s => s.Pin === u.Pin)", icon="check-square", size="lg")
</template>
<script>
export default {
  name: 'user-list',
  props: {
    users: { type: Array },
    selected: { type: Array },
  },
  filters: {
    pin(val) {
      return `${val.slice(0, 3)} ${val.slice(3)}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.user-list {
  display: flex;
  flex-direction: column;
  .user {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 2px solid #333333;
  }
}
</style>
