<template lang="pug">
  form.login
    span Pin:
    input(type="password", name="pin",v-model="pin")
    button(type="submit",@click.prevent="submit") Login
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      pin: '',
    };
  },
  methods: {
    ...mapActions('app', ['login', 'error']),
    async submit() {
      try {
        console.log(this.pin);
        await this.login(this.pin);
        this.pin = '';
        this.$router.push('/');
      } catch (e) {
        console.log(e.response.Message);
        if (e.response && e.response.Message) {
          this.error({ message: e.response.Message });
        }
      }
    },
  },
};
</script>
