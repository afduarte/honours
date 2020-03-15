<template lang="pug">
  .home
    h1 Your Projects
    h3(v-if="!projectList.length && !loading")
      | It seems like you've not been assigned any projects yet 😢
    router-link(v-if="$isAdmin", to="/admin/project-wizard") Create a new project
    .projects
      router-link(v-for="p in projectList", :key="p.Name",
        :to="'/annotate/project/'+encodeURIComponent(p.Name)")
        .project
          h3 {{p.Name}}
          p(v-if="ac[p.AnnotationType]") Type:
            b {{ac[p.AnnotationType].name}}
          p
            b {{p.Users.length}} Annotator{{p.Users.length > 1?'s':''}}

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
    ...mapState('user', ['user']),
    ...mapState('app', ['loading']),
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
  padding: 10px 100px;
  h1, h3 {
    text-align: center;
  }
  & > a {
    text-align: center;
    justify-self: center;
    max-width: 17ch;
    margin-bottom: 20px;
  }
  display: grid;
  .projects {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    .project {
      text-align: center;
      padding: 10px;
    }
  }
}
</style>
