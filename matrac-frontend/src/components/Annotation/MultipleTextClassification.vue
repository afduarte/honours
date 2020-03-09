<template lang="pug">
  .annotation
    .box
      .target
        p {{target}}
      .context
        p.title Context:
        p {{context}}
    .options
      .option(v-for="o in options", @click="clicked(o)", :class="{active:selected[o]}")
        p {{o}}
    .submit
      .option(@click="submit")
        p Submit
        kbd Enter

</template>
<script>
import Vue from 'vue';

export default {
  props: {
    options: { type: Array },
    id: { type: String },
    target: { type: String },
    context: { type: String },
  },
  data() {
    return {
      selected: {},
    };
  },
  methods: {
    clicked(option) {
      if (this.selected[option]) {
        Vue.delete(this.selected, option);
      } else {
        Vue.set(this.selected, option, true);
      }
    },
    keyed(evt) {
      if (evt.key === 'Enter') {
        this.submit();
      }
    },
    submit() {
      this.$emit('next');
      this.$emit('submit', Object.keys(this.selected));
      this.selected = {};
    },
  },
  mounted() {
    document.addEventListener('keypress', this.keyed);
  },
  beforeDestroy() {
    document.removeEventListener('keypress', this.keyed);
  },
};
</script>
<style lang="scss" scoped>
.annotation {
  display: grid;
  height: 100vh;
  background-color: #333333;
  grid-template-columns: 1fr 2fr 10fr 2fr 1fr;
  grid-template-rows: 1fr 5fr 3fr 3fr;
  .box {
    background-color: #ffffff;
    margin: 20px;
    box-shadow: -3px 3px 20px 10px #00000050;
    border-radius: 10px;
    grid-column: 3;
    grid-row: 2;
    text-align: center;
    .target {
      font-size: 3em;
    }
    .context {
      font-size: 2em;
      .title {
        font-size: 0.8em;
      }
    }
  }
  .options,
  .submit {
    margin-top: 20px;
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row: 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .option {
      cursor: pointer;
      margin: 10px;
      font-size: 2em;
      background-color: #ffffff;
      padding: 20px;
      border: 4px solid #333333;
      border-radius: 10px;
      box-shadow: -3px 3px 5px 3px #00000050;
      &:hover {
        box-shadow: -3px 3px 5px 3px #5b34af50;
        border-color: #5b34af;
      }
      &.active{
        background-color: #5b34af;
        color: #ffffff;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-block-end: 5px;
        margin-block-start: 0;
      }
    }
  }
  .submit {
    grid-row: 4;
    .option {
      kbd {
        text-align: center;
        margin: 0 auto;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.1em 0.5em;
        margin: 0 0.2em;
        box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #d4d4d4 inset;
        background-color: #cacaca;
      }
    }
  }
}
</style>
