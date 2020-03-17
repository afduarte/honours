<template lang="pug">
  .instructions(:class="{show}")
    fa-icon.icon(:icon="show?'times-circle':'info-circle'", size="4x", @click="show = !show")
    slot(v-if="show")
</template>
<script>
export default {
  name: 'instructions',
  props: {
    defaultOpen: { type: Boolean, required: false, default: () => true },
  },
  data() {
    return {
      show: this.defaultOpen,
    };
  },
};
</script>
<style lang="scss" scoped>
.instructions {
  position: relative;
  font-size: 16px;
  padding: 10px;
  font-weight: bold;
  &.show {
    background-color: #c8b0fc;
    border-radius: 10px;
    border-top-right-radius: 30px;
  }
  .icon {
    transition: 500ms;
    color: #5b34af;
    position: absolute;
    top: 0px;
    right: 0px;
  }
}
</style>
