<template lang="pug">
  .annotation-bar
    .project(v-if="project")
      p Project: {{project.Name}}
    .history
      .utterance(v-for="h in cutHistory")
        p {{h.utterance}}
        p {{h.tags}}
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('utterance', ['project', 'history']),
    cutHistory() {
      return this.history.slice(-10);
    },
  },
};
</script>
