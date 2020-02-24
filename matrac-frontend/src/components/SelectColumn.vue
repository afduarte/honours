<template lang="pug">
  .container
    .text
      p {{text}}
    .select
      template(v-if="editing")
        select(v-model="value")
          option(v-for="(v,k) in innerOpts", :value="k") {{v}}
      template(v-else)
        p {{valueName}}
</template>
<script>
export default {
  props: {
    editing: { type: Boolean },
    options: { type: Object },
    text: { type: String },
  },
  data() {
    return {
      value: null,
      innerOpts: { ...this.options, null: '-- None --' },
    };
  },
  computed: {
    valueName() {
      if (!this.value) return 'None ⌄';
      return this.options[this.value];
    },
  },
  watch: {
    value() {
      this.$emit('selected', this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
  .container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .text{
      margin-left: 5px;
    }
    .select {
      cursor: pointer;
      margin-right: 5px;
      border: 1px solid #333333;
      padding: 5px;
      border-radius: 10px;
    }
  }
</style>
