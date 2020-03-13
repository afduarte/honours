<template lang="pug">
  .user-list
    .user.header
      p Pin
      p Role
      p Associated projects
      p {{extraRowText}}
    .rows
      .user(v-for="u in users", :class="{clickable}",
        @click="clickable?$emit('user-click',u):null")
        p {{u.Pin | pin}}
        p {{u.Role | role}}
        p {{u.Sessions | firstXPlus(3)}}
        p
          fa-icon(v-if="selected.find(s => s.Pin === u.Pin)", icon="check-square", size="lg")
</template>
<script>
export default {
  name: 'user-list',
  props: {
    users: { type: Array },
    selected: { type: Array, required: false, default: () => [] },
    extraRowText: { type: String, required: false, default: () => 'Selected' },
    clickable: { type: Boolean, required: false, default: () => false },
  },
  filters: {
    pin(val) {
      return `${val.slice(0, 3)} ${val.slice(3)}`;
    },
    role(val) {
      return val.substring(0, val.length - 4);
    },
    firstXPlus(val, howMany) {
      if (val.length <= howMany) {
        return val.map(s => s.Name).join(', ');
      }
      return `${val
        .slice(0, howMany)
        .map(s => s.Name)
        .join(', ')} and ${val.length - howMany} others`;
    },
  },
};
</script>
<style lang="scss" scoped>
.user-list {
  display: flex;
  flex-direction: column;
  .rows{
    overflow-y: scroll;
    max-height: 75vh;
  }
  .user {
    transition: 50ms;
    text-align: left;
    display: grid;
    grid-template-columns: 0.6fr 0.5fr 1.5fr 0.5fr;
    border-bottom: 2px solid #333333;
    p:not(:last-child) {
      border-right: 1px solid #333333;
      padding-left: 10px;
    }
    p:last-child {
      text-align: center;
    }
    &.header {
      text-align: center;
      border-bottom: 5px solid #333333;
      padding-right: 15px;
      p {
        padding-left: 0;
      }
    }
    &.clickable:hover{
      cursor:pointer;
      background-color: #333333;
      color: #ffffff;
    }
  }
}
</style>
