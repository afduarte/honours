<template lang="pug">
  #app
    .loading(v-if="loading")
      fa-icon(icon="spinner", size="4x", :spin="true")
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
};
</script>

<style lang="scss" scoped>
.loading{
  position:absolute;
  width: 100%;
  text-align:center;
  top: 50px;
  color: #5b34af;
}
/*
  COLOUR PALLETE
  PRIMARY: #3F247A
  PRIMARY-ACTIVE: #D583E9

  SECONDARY: #D6D6D6
  SECONDARY-DARKER: #686868
 */
</style>
