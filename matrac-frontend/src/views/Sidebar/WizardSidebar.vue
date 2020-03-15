<template lang="pug">
  .wizard-bar
    .links
      router-link(@click.native="$event.stopImmediatePropagation()",
        to="/admin/project-wizard") New Project Wizard
      .links(v-if="step > 0")
        router-link(@click.native="$event.stopImmediatePropagation()",
          :class="{'router-link-active': step === 1}",
          :to="routes[0]") Project
        router-link(:disabled="step <= 1",
          @click.native="$event.stopImmediatePropagation()",
          :class="{'router-link-active': step === 2}",
          :to="addProject(routes[1])") Dataset
        router-link(:disabled="step <= 2",
          @click.native="$event.stopImmediatePropagation()",
          :class="{'router-link-active': step === 3}",
          :to="addProject(routes[2])") Users
        router-link(:disabled="step <= 3",
          @click.native="$event.stopImmediatePropagation()",
          :class="{'router-link-active': step === 4}",
          :to="addProject(routes[3])") Task Type
      router-link.back(@click.native="$event.stopImmediatePropagation()",
        to="/admin") Exit Wizard
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      routes: [
        '/admin/project-wizard/create-project',
        '/admin/project-wizard/link-dataset',
        '/admin/project-wizard/link-users',
        '/admin/project-wizard/project-type',
      ],
    };
  },
  computed: {
    ...mapGetters('wizard', ['activeProject', 'activeDataset']),
    users() {
      if (!this.activeProject || !this.activeProject.Users) {
        return { head: [], tail: [] };
      }
      return {
        head: this.activeProject.Users.slice(0, 3),
        tail: this.activeProject.Users.slice(3),
      };
    },
    step() {
      if (this.$route.path === '/admin/project-wizard') return 0;
      return this.routes.findIndex(r => this.$route.path.indexOf(r) > -1) + 1;
    },
    addProject() {
      return to => (this.activeProject ? `${to}/${encodeURIComponent(this.activeProject.Name)}` : to);
    },
  },
};
</script>
<style lang="scss" scoped>
.links {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  a {
    margin-left: 35px;
    margin-bottom: 10px;
  }
  .links a {
    margin-left: 55px;
    margin-bottom: 15px;
  }
}
</style>
