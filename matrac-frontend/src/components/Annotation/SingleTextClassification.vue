<template lang="pug">
  .annotation
    .target
      p {{target}}
    .context
      p Context:
      p {{context}}
</template>
<script>
export default {
  props: {
    options: { type: Array },
    id: { type: String },
    target: { type: String },
    context: { type: String },
  },
};
</script>
<style lang="scss" scoped>

</style>
