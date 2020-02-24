<template lang="pug">
  .new-project
    h3 New Project
    p Name
    input(type="text", v-model="name")
    p Tags (comma separated)
    input(type="text", v-model="tags")
    button(type="submit", @click.prevent="$emit('submit',{name,tags})") Submit
</template>
<script>
export default {
  name: 'project-form',
  data() {
    return {
      name: '',
      tags: '',
    };
  },
};
</script>
<style lang="scss" scoped>

</style>
