<template lang="pug">
  #app
    .loading(v-if="loading")
      fa-icon(icon="spinner", size="4x", :spin="true")
    template(v-if="userLoggedIn")
      Layout
    modal(v-else)
      Login
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
    ...mapState('app', ['loading']),
    ...mapState('user', ['user']),
    ...mapGetters('user', ['userLoggedIn']),
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .loading {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50px;
    color: #5b34af;
  }
}
button,
a {
  transition: 500ms;
  border: 2px solid #333333;
  border-radius: 5px;
  background-color: white;
  color: #333333;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    color: #ffffff;
  }
  &.router-link-active:not(.home),
  .router-link-exact-active {
    background-color: #5b34af;
    border: 2px solid #6c3ed1;
    color: #ffffff;
  }
}
input {
  outline: none;
  margin: 0;
  border: none;
  font-size: 20px;
  font-family: inherit;
  line-height: 50px;
  background: #eeeeee;
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  padding: 0 20px;
  color: #333333;
  transition: all 0.4s ease;
  &::-webkit-input-placeholder {
    color: #666;
  }
}
small {
  margin-left: 5px;
  color: #333333;
}
/*
  COLOUR PALLETE
  PRIMARY: #5b34af
  PRIMARY-ACTIVE: #D583E9

  SECONDARY: #D6D6D6
  SECONDARY-DARKER: #686868
 */
</style>
