<template lang="pug">
  .square(@click="$emit('click')")
    fa-icon.icon(v-if="icon !== ''", :icon="icon")
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
  transition: 300ms;
  text-align: center;
  padding: 20px;
  border: 3px solid #333333;
  border-radius: 5px;
  cursor: pointer;
  .icon {
    font-size: 3em;
  }
  &:hover {
    background-color: #d6d6d6;
    color: #d583e9;
  }
}
</style>
