<template lang="pug">
  .annotation-bar
    .project(v-if="project")
      p Project:
        b  {{project.Name}}
    .history
      p History:
      transition-group(name="list", tag="div")
        .utterance(:key="h.utterance+h.tags", v-for="h in cutHistory")
          p {{h.utterance}}
          p.tags {{h.tags}}
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('utterance', ['project', 'history']),
    cutHistory() {
      return this.history.slice(-5);
    },
  },
};
</script>
<style lang="scss" scoped>
.project{
  font-size: 1.3em;
  border-bottom: 2px solid #333333;
}
.history{
  & > p {
    font-size: 1.3em;
    border-bottom: 1px solid #333333;
  }
  .utterance {
    border-bottom: 1px solid #333333;
    .tags{
      color: #5b34af;
    }
  }
}
.list-enter-active, .list-leave-active, .list-move {
  transition: all 500ms;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
  position: absolute;
}
.list-leave-to{
  opacity: 0;
  transform: translateY(-30px);
  position: absolute;
}

</style>
