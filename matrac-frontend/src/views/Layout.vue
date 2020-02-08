<template lang="pug">
  .layout(:class="sidebarClasses")
    .header
      .nav
        route-link(to="/") Home
        route-link(to="/admin") Administration
    .sidebar-left(@click="toggleSidebar('left')")
    .content
      router-view
    .sidebar-right(@click="toggleSidebar('right')")
    .footer

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'layout',
  computed: {
    ...mapState('app', ['sidebarL', 'sidebarR']),
    sidebarClasses() {
      return {
        sbl: this.sidebarL && !this.sidebarR,
        sbr: this.sidebarR && !this.sidebarL,
        sblr: this.sidebarL && this.sidebarR,
      };
    },
  },
  methods: {
    ...mapActions('app', ['toggleSidebar']),
  },
};
</script>
<style lang="scss" scoped>
.layout {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3F247A;
  transition: 1s;
  display: grid;
  grid-template-columns: 1fr 82fr 1fr;
  &.sbl{
    transition: 1s;
    grid-template-columns: 12fr 71fr 1fr;
  }
  &.sbr{
    transition: 1s;
    grid-template-columns: 1fr 71fr 12fr;
  }
  &.sblr{
    transition: 1s;
    grid-template-columns: 12fr 60fr 12fr;
  }
  grid-template-areas:
    "header header header"
    "sbl content sbr"
    "footer footer footer";

  .header {
    grid-area: header;
    box-shadow: -1px 1px 3px 1px #d6d6d6;
    .nav {
      padding: 30px;

      route-link {
        font-weight: bold;
        color: #3F247A;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        background-color: #D6D6D6;

        &.router-link-exact-active {
          color: #D583E9;
        }
      }
    }
  }

  .sidebar-left {
    grid-area: sbl;
  }

  .content {
    background-color:#D6D6D6;
    grid-area: content;
    min-height: 500px;
  }

  .sidebar-right {
    grid-area: sbr;
  }

  .footer {
    grid-area: footer;
  }
}
</style>
