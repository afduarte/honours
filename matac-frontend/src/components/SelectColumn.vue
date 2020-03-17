<template lang="pug">
  .select
    select(v-model="value")
      option(v-for="(v,k) in innerOpts", :value="k") {{v}}
</template>
<script>
export default {
  props: {
    options: { type: Object },
  },
  data() {
    return {
      value: null,
      innerOpts: { ...this.options, [null]: 'None' },
    };
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
    select {
      font-size: 1em;
      padding: 5px;
      border: none;
      background-color: #ffffff;
      width: 100%;
      &:focus{
        outline: none;
      }
    }
  }
</style>
