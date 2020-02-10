<template lang="pug">
  form.login
    h2 Pin
    input(type="password", name="pin",v-model="pin")
    button(type="submit", @click="submit",@keyup.enter="submit") Login
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      pin: '',
    };
  },
  methods: {
    ...mapActions('app', ['error']),
    ...mapActions('user', ['login']),
    async submit(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      try {
        await this.login(this.pin);
        this.pin = '';
      } catch (e) {
        if (e.response && e.response.Message) {
          this.error({ message: e.response.Message });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  flex-direction: column;
}
</style>
