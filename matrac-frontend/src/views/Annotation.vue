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
      project: null,
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
    ...mapState('utterance', ['utteranceList', 'current']),
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
    ...mapActions('utterance', ['fetchUtterances', 'submitUtterance']),
    submitted(evt) {
      console.log(evt);
      this.submitUtterance();
    },
  },
  async mounted() {
    this.project = this.projectList.find(p => p.Name === this.session);
    await this.fetchUtterances(this.project.Name);
  },
};
</script>
<style lang="scss" scoped>

</style>
