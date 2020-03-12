<template lang="pug">
  .layout(:class="sidebarClasses")
    .sidebar-left(@click="toggleSidebar('left')")
      .nav(:class="{ hidden:!sidebarL }")
        .logo
          img(alt="M-ATRAC", src="../assets/matrac-logo.svg", width="150px")
        router-link.home(to="/", @click.native="$event.stopImmediatePropagation()") Annotate
        router-link(to="/admin", v-if="user && user.Role ==='AdminRole'",
          @click.native="$event.stopImmediatePropagation()") Manage
      .inner(:class="{ hidden:!sidebarL }")
        SideBarSwitcher
      .arrow
        div
          fa-icon.icon(:icon="getArrow('l')")
      .logout(:class="{ hidden:!sidebarL }")
        router-link(to="/logout", @click.native="$event.stopImmediatePropagation()") Logout
    .content
      router-view

</template>

<script>
import { mapState, mapActions } from 'vuex';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SideBarSwitcher from './Sidebar/Switcher.vue';

export default {
  name: 'layout',
  components: { SideBarSwitcher },
  computed: {
    ...mapState('app', ['sidebarL', 'sidebarR']),
    ...mapState('user', ['user']),
    sidebarClasses() {
      return {
        sbl: this.sidebarL,
      };
    },
    getArrow() {
      return (side) => {
        switch (side) {
          case 'l':
            return this.sidebarL ? faAngleLeft : faAngleRight;
          case 'r':
            return this.sidebarR ? faAngleRight : faAngleLeft;
          default:
            return null;
        }
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
  transition: 1s;
  display: grid;
  grid-template-columns: 2fr 80fr;
  &.sbl {
    transition: 1s;
    grid-template-columns: 12fr 70fr;
  }
  grid-template-areas: "sbl content";
  .sidebar-left {
    grid-area: sbl;
    padding-left: 20px;
    display: grid;
    grid-template-columns: 9fr 1fr;
    grid-template-rows: 1fr 2fr 0.5fr;
    .logo {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .nav, .logout {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 10px;
      grid-column: 1;
      grid-row: 1;
      padding-left: 15px;
      a {
        margin-bottom: 10px;
        text-align: center;
      }
    }
    .logout {
      grid-row: 3;
    }
    .inner {
      transition: 1s;
      grid-column: 1;
      grid-row: 2;
    }
    .hidden {
      width: 0;
      display: none;
    }
    .arrow {
      text-align: right;
      padding: 5px;
      font-size: 2em;
      grid-column: 2;
      grid-row: 2;
      display: flex;
      flex-direction: row;
      div {
        align-self: center;
      }
    }
  }

  .sidebar-left {
    grid-area: sbl;
    box-shadow: 3px 3px 3px 1px #666666a1;
    border-right: 2px solid #333333;
  }

  .content {
    z-index: 1;
    grid-area: content;
    min-height: 100vh;
  }
}
</style>
