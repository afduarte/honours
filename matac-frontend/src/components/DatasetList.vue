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
      p {{d.TargetIdx}}
      p {{d.ContextIdx || 'None'}}
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
  margin-bottom: 20px;
  .dataset {
    transition: 100ms;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr repeat(4, 0.5fr);
    border-bottom: 2px solid #333333;
    p:not(:last-child) {
      border-right: 1px solid #333333;
    }
    p{
      padding-left: 10px;
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
    &:hover:not(.header):not(.active){
      cursor:pointer;
      background-color: #333333;
      color: #ffffff;
    }
    &.active{
      cursor:pointer;
      background-color: #5b34af;
      color: #ffffff;
    }
  }
}
</style>
