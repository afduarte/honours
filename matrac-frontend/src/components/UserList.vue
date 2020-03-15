<template lang="pug">
  .user-list
    .user.header
      p {{extraRowText}}
      p Pin
      p Role
      p Associated projects
    .rows
      .user(v-for="u in users", :class="{clickable}",
        @click="clickable?$emit('user-click',u):null")
        p
          fa-icon(v-if="selected.find(s => s.Pin === u.Pin)", icon="check-square", size="lg")
          fa-icon(v-else, :icon="['far','square']", size="lg")
        p {{u.Pin | pin}}
        p {{u.Role | role}}
        p {{u.Sessions | firstXPlus(3)}}
</template>
<script>
export default {
  name: 'user-list',
  props: {
    users: { type: Array },
    selected: { type: Array, required: false, default: () => [] },
    extraRowText: { type: String, required: false, default: () => 'In project?' },
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
      const rest = val.length - howMany;
      return `${val
        .slice(0, howMany)
        .map(s => s.Name)
        .join(', ')} and ${rest} other${rest > 1 ? 's' : ''}`;
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
    max-height: 60vh;
  }
  .user {
    transition: 50ms;
    text-align: left;
    display: grid;
    grid-template-columns: 0.5fr 0.6fr 0.5fr 1.5fr;
    border-bottom: 2px solid #333333;
    p:not(:last-child) {
      border-right: 1px solid #333333;
    }
    p:not(:first-child){
      padding-left: 10px;
    }
    p:first-child {
      text-align: center;
    }
    &.header {
      text-align: center;
      border-bottom: 5px solid #333333;
      padding-right: 15px;
      p {
        padding-left: 0;
        align-self: center;
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
