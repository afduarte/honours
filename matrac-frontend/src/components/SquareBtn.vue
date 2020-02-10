<template lang="pug">
  .square(@click="$emit('click')")
    fa-icon(v-if="icon !== ''", :icon="icon")
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
  padding: 30px;
  cursor: pointer;
}
</style>
