<template lang="pug">
  .dataset-list
    .dataset.header
      p Name
      p Type
      p Unique Field
      p Annotation Target
      p Context Field
    .dataset(v-for="d in datasets",
      @click="$emit('dataset-click',d)",
      :class="{active: active === d}")
      p {{d.Name}}
      p {{d.Type}}
      p {{d.IDIdx}}
      p {{d.UserIdx}}
      p {{d.ResponseIdx}}
</template>
<script>
export default {
  name: 'dataset-list',
  props: {
    datasets: { type: Array },
    active: { type: Object },
  },
};
</script>
<style lang="scss" scoped>
.dataset-list {
  display: flex;
  flex-direction: column;
  .dataset {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    &.active {
      background-color: aqua;
    }
  }
}
</style>
