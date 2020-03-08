<template lang="pug">
  .wizard-bar
    .step(v-if="step")
      p Step {{step+1}}/{{routes.length}}
    .project(v-if="activeProject")
      p Project: {{activeProject.Name}}
      .users(v-if="users && users.head.length")
        p Users:
        p(v-for="u in users.head")  {{u.Pin}}
        p(v-if="users.tail.length") and {{users.tail.length}} others
    .dataset(v-if="activeDataset")
      p Dataset: {{activeDataset.Name}}
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
      const current = this.routes.findIndex(r => this.$route.path.indexOf(r) > -1);
      return current;
    },
  },
};
</script>
