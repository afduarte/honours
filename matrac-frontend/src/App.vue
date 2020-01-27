<template lang="pug">
  #app
    p(v-if="error") {{error}}
    p(v-if="loading") Loading...
    p(v-if="user.Pin") Logged in as: {{user.Pin}}
    p(v-else) Not logged in
    #nav
      router-link(to="/") Home
      router-link(to="/about") About
    router-view
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('app', ['user', 'loading', 'error']),
  },
  mounted() {

  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
