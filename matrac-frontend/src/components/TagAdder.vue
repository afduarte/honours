<template lang="pug">
  .tag-adder
    .tags
      template(v-for="t in tags")
        .tag {{t}}
    template(v-if="adding")
      input(v-model="editing", type="text")
      button(@click="addTag") Add
    template(v-else)
      button(@click="adding = true") +
    template(v-if="this.tags.length")
      button(@click="tags = []") Clear
</template>
<script>
export default {
  name: 'tag-adder',
  props: ['value'],
  data() {
    return {
      adding: false,
      editing: '',
      tags: this.value.split(',').filter(x => x !== ''),
    };
  },
  methods: {
    addTag() {
      this.tags.push(this.editing.trim().replace(/,/g, ' ').trim());
      this.editing = '';
      this.adding = false;
    },
  },
  watch: {
    tags() {
      this.$emit('input', this.tags.join());
    },
  },
};
</script>
<style lang="scss" scoped>
.tags{
  .tag{
    padding: 5px;
    border: 2px solid #333333;
  }
}

</style>
