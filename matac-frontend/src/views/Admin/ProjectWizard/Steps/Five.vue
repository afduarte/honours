<template lang="pug">
  .done
    h2 Project creation finished successfully!
    button(@click="done") Go back to menu

</template>

<script>
export default {
  name: 'Done',
  methods: {
    async done() {
      this.$router.push('/admin');
    },
  },
};
</script>

<style lang="scss" scoped>
.done{
  text-align: center;
}
</style>
