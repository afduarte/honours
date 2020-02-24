<template lang="pug">
  .list
    .project.header
      p ID
      p Creator
      p Created
      p Tags
      p Dataset
    .project(v-for="p in projects",
      @click="$emit('project-click',p)",
      :class="{active: active === p}")
      p {{p.Name}}
      p {{p.CreatorID}}
      p {{p.Created}}
      p {{p.Options}}
      p {{p.DatasetID?p.DatasetID:'No Linked Dataset'}}
</template>
<script>
export default {
  name: 'project-list',
  props: {
    projects: { type: Array },
    active: { type: Object },
  },
};
</script>
<style lang="scss" scoped>
.project-list {
  display: flex;
  flex-direction: column;
  .project {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    &.active {
      background-color: aqua;
    }
  }
}
</style>
