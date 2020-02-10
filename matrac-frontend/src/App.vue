<template lang="pug">
  #app
    p(v-if="loading") Loading...
    template(v-if="userLoggedIn")
      Layout
    modal(v-else)
      .header(slot="header")
        h1 Login
      .body(slot="body")
        Login
      .footer(slot="footer")
        p(v-if="error") {{error}}
        p(v-else) Log in with the 6 digit pin code provided to you by an Administrator
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Modal from '@/components/Modal.vue';
import Login from '@/views/Login.vue';
import Layout from '@/views/Layout.vue';

export default {
  components: {
    Modal,
    Login,
    Layout,
  },
  computed: {
    ...mapState('app', ['loading', 'error']),
    ...mapState('user', ['user']),
    ...mapGetters('user', ['userLoggedIn']),
  },
  mounted() {

  },
};
</script>

<style>
/*
  COLOUR PALLETE
  PRIMARY: #3F247A
  PRIMARY-ACTIVE: #D583E9

  SECONDARY: #D6D6D6
  SECONDARY-DARKER: #686868
 */
body{
  background-color: #D6D6D6;
}
</style>
