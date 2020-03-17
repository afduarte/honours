<template lang="pug">
  .tag-adder
    .tags
      template(v-for="t in tags")
        .tag {{t}}
    template(v-if="adding")
      .adding
        input(v-model="editing", type="text")
        button(@click="addTag") Add
    template(v-else)
      .btns
        button(@click="adding = true") +
        button(v-if="this.tags.length", @click="tags = []") Clear
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
.tag-adder {
  display: flex;
  flex-direction: column;
  button {
    margin: 5px;
  }
  .tags {
    display: flex;
    flex-direction: row;
    .tag {
      padding: 10px;
      border-radius: 5px;
      color: #ffffff;
      background-color: #5b34af;
      border: 2px solid #5b34af;
      margin: 5px;
    }
  }
}
</style>
