<template lang="pug">
  form.add-users
    h3 Generate Users
    input(type="number", min="1", max="100", v-model="howMany", @keyup.enter="sendEvent")
    button(type="submit", @click.prevent="sendEvent") Submit
</template>
<script>
export default {
  name: 'user-form',
  data() {
    return {
      howMany: 1,
    };
  },
  methods: {
    sendEvent() {
      this.$emit('submit', this.howMany);
      this.howMany = 1;
    },
  },
};
</script>
<style lang="scss" scoped>
button{
  margin-left: 10px;
}
</style>
