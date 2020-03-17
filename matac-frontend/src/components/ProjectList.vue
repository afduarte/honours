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
    transition: 100ms;
    text-align: left;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 3fr 0.5fr;
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
