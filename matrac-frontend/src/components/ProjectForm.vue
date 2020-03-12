<template lang="pug">
  .new-project
    h3 New Project
    p Name
      small The name of the project
    input(type="text", v-model="name")
    p Tags
      small A list of tags for the classification task. Click the plus button to add tags.
    tag-adder(v-model="tags")
    button.submit(type="submit", @click.prevent="$emit('submit',{name,tags})") Submit
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
.submit{
  margin-left: 5px;
}
</style>
