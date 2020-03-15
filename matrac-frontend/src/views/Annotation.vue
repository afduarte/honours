<template lang="pug">
  .container
    component(v-if="project",
      :is="ac[uProject.AnnotationType].component",
      :options="opts",
      :id="currentUtterance.ID",
      :target="currentUtterance.Text"
      :context="currentUtterance.Response",
      @submit="submitted"
      )
    .history
      p History:
      transition-group(name="list", tag="div")
        .utterance(:key="h.utterance+h.tags", v-for="h in cutHistory")
          p {{h.utterance}}
          p.tags {{h.tags}}

</template>

<script>
import { mapState, mapActions } from 'vuex';
import anComponents from '@/components/Annotation';

export default {
  name: 'Annotation',
  props: ['project'],
  data() {
    return {
      ac: anComponents,
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
    ...mapState('utterance', {
      utteranceList: 'utteranceList',
      current: 'current',
      uProject: 'project',
      history: 'history',
    }),
    cutHistory() {
      return this.history.slice(-9);
    },
    opts() {
      if (!this.uProject) return [];
      return this.uProject.Options.split(',');
    },
    currentUtterance() {
      if (!this.utteranceList.length) return {};
      return this.utteranceList[this.current];
    },
  },
  methods: {
    ...mapActions('utterance', [
      'fetchUtterances',
      'setProject',
      'submitUtterance',
      'startSession',
    ]),
    async submitted(tags) {
      await this.submitUtterance({
        project: this.uProject.Name,
        tags: tags.join(','),
        utterance: this.currentUtterance.ID,
      });
    },
  },
  async mounted() {
    const pr = this.projectList.find(p => p.Name === this.project);
    await this.setProject(pr);
    await this.fetchUtterances();
    this.startSession();
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 9fr 2fr;
  .history {
    padding-left: 10px;
    box-shadow: 3px 3px 3px 1px #666666a1;
    overflow-y: hidden;
    max-height: 100vh;
    & > p {
      font-size: 1.3em;
      border-bottom: 1px solid #333333;
    }
    .utterance {
      border-bottom: 1px solid #333333;
      .tags {
        color: #5b34af;
      }
    }
  }
  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: all 50ms;
  }
  .list-enter {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
