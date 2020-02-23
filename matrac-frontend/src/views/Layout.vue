<template lang="pug">
  .layout(:class="sidebarClasses")
    .header
      .nav
        router-link(to="/") Home
        router-link(to="/admin") Administration
    .sidebar-left(@click="toggleSidebar('left')")
      template(v-if="sidebarL")
        .inner
          p this is the left sidebar
      .arrow
        fa-icon(:icon="getArrow('l')")
    .content
      router-view
    .sidebar-right(@click="toggleSidebar('right')")
      .arrow
        fa-icon(:icon="getArrow('r')")
      template(v-if="sidebarR")
        .inner
          p this is the right sidebar
    .footer

</template>

<script>
import { mapState, mapActions } from 'vuex';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3f247a;
  transition: 1s;
  display: grid;
  grid-template-columns: 1fr 82fr 1fr;
  &.sbl {
    transition: 1s;
    grid-template-columns: 12fr 71fr 1fr;
  }
  &.sbr {
    transition: 1s;
    grid-template-columns: 1fr 71fr 12fr;
  }
  &.sblr {
    transition: 1s;
    grid-template-columns: 12fr 60fr 12fr;
  }
  grid-template-areas:
    "header header header"
    "sbl content sbr"
    "sbl footer sbr";

  .header {
    grid-area: header;
    box-shadow: -1px 1px 3px 1px #d6d6d6;
    .nav {
      padding: 30px;

      a {
        font-weight: bold;
        color: #3f247a;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        background-color: #d6d6d6;

        &.router-link-exact-active {
          color: #d583e9;
        }
      }
    }
  }
  .sidebar-left,
  .sidebar-right {
    display: flex;
    flex-direction: row;
    .inner{
      width:90%;
    }
    .arrow {
      align-self: center;
      padding: 5px;
      font-size: 2em;
    }
  }

  .sidebar-left {
    grid-area: sbl;
    box-shadow: 3px 3px 3px 1px #d6d6d6;
    .arrow {text-align: right;}
  }

  .content {
    grid-area: content;
    min-height: 90vh;
  }

  .sidebar-right {
    grid-area: sbr;
    box-shadow: -3px 3px 3px 1px #d6d6d6;
    .arrow {text-align: left;}
  }

  .footer {
    grid-area: footer;
  }
}
</style>
