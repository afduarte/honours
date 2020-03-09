<template lang="pug">
  .home
    .logo
      img(alt="M-ATRAC", src="../assets/matrac-logo.svg", width="200px")
    h2 Your Projects
    .projects
      router-link(v-for="p in projectList", :to="'/annotate/'+encodeURIComponent(p.Name)")
        .project
          h3 {{p.Name}}
          p Type:
            b {{ac[p.AnnotationType].name}}

</template>

<script>
import { mapActions, mapState } from 'vuex';
import AnnotationComponents from '@/components/Annotation';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      ac: AnnotationComponents,
    };
  },
  computed: {
    ...mapState('project', ['projectList']),
  },
  methods: {
    ...mapActions('project', ['fetchProjects']),
  },
  async mounted() {
    await this.fetchProjects();
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 10px;
  h2 {
    text-align: center;
  }
  display: grid;
  grid-template-rows: 2fr 1fr 8fr;
  .logo {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .projects {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    .project {
      text-align: center;
      padding: 10px;
      max-height: 100px;
      border: 3px solid #333333;
    }
  }
}
</style>
