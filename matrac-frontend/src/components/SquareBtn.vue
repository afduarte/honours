<template lang="pug">
  .square(@click="$emit('click')")
    fa-icon.icon(v-if="icon", :icon="icon")
    p {{text}}
</template>

<script>
export default {
  name: 'square-btn',
  props: {
    text: { type: String, required: true },
    icon: { type: String, required: false },
  },
};
</script>

<style lang="scss" scoped>
.square {
  text-align: center;
  padding: 20px;
  height: 100%;
  cursor: pointer;
  .icon {
    font-size: 3em;
  }
}
</style>
