<template lang="pug">
  component(v-if="project",
    :is="ac[project.AnnotationType].component",
    :options="opts",
    :id="currentUtterance.ID",
    :target="currentUtterance.Text"
    :context="currentUtterance.Response",
    @submit="submitted"
    )

</template>

<script>
import { mapState, mapActions } from 'vuex';
import anComponents from '@/components/Annotation';

export default {
  name: 'Annotation',
  props: ['session'],
  data() {
    return {
      ac: anComponents,
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
    ...mapState('utterance', ['utteranceList', 'current', 'project']),
    opts() {
      if (!this.project) return [];
      return this.project.Options.split(',');
    },
    currentUtterance() {
      if (!this.utteranceList.length) return {};
      return this.utteranceList[this.current];
    },
  },
  methods: {
    ...mapActions('utterance', ['fetchUtterances', 'setProject', 'submitUtterance']),
    async submitted(tags) {
      await this.submitUtterance({
        project: this.project.Name,
        tags: tags.join(','),
        utterance: this.currentUtterance.ID,
      });
    },
  },
  async mounted() {
    const pr = this.projectList.find(p => p.Name === this.session);
    await this.setProject(pr);
    await this.fetchUtterances();
  },
};
</script>
<style lang="scss" scoped>

</style>
