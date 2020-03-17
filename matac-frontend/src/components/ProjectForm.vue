<template lang="pug">
  .new-project
    .fields
      .name
        p Name
        input(type="text", v-model="name")
      .tags
        p Tags
        tag-adder(v-model="tags")
    .submit
      button(type="submit", @click.prevent="$emit('submit',{name,tags})") Submit
</template>
<script>
import TagAdder from '@/components/TagAdder.vue';

export default {
  name: 'project-form',
  components: { TagAdder },
  data() {
    return {
      name: '',
      tags: '',
    };
  },
};
</script>
<style lang="scss" scoped>
.new-project {
  .fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .submit {
    display:flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
