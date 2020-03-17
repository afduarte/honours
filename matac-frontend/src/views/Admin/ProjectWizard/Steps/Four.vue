<template lang="pug">
  .select-type
    .types
      .type(v-for="(v,k) in available",
        @click="selected = selected === k ? null : k",
        :class="{active:k === selected}")
        h3 {{v.name}}
        img(:src="v.image")
        p {{v.description}}
    p Selected:
      b  {{selected?available[selected].name:'None'}}
    .nav
      button(@click="prevStep") Previous
      button(@click="nextStep", :disabled="!selected") Finish

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';
import AnnotationComponents from '@/components/Annotation';

export default {
  components: { UserList, UserForm },
  props: ['project'],
  name: 'SetAnnotationType',
  data() {
    return {
      available: AnnotationComponents,
      selected: null,
    };
  },
  computed: {
    ...mapGetters('wizard', ['activeProject']),
    ...mapState('project', ['projectList']),
  },
  methods: {
    ...mapActions('project', ['fetchProjects', 'updateAnnotationType']),
    ...mapActions('wizard', ['setActiveProject']),
    ...mapActions('app', ['error']),
    async nextStep() {
      await this.updateAnnotationType({
        project: this.activeProject.Name,
        annotationType: this.selected,
      });
      this.$router.push('/admin/project-wizard/done');
    },
    prevStep() {
      this.$router.push(`/admin/project-wizard/link-users/${encodeURIComponent(this.project)}`);
    },
  },
  async mounted() {
    const pr = this.projectList.find(p => p.Name === this.project);
    await this.setActiveProject(pr);
  },
};
</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.select-type {
  display: flex;
  flex-direction: column;
  .types {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    .type {
      padding: 10px;
      border-radius: 10px;
      &.active {
        padding: 7px;
        border: 3px solid #333333;
      }
      h3 {
        text-align: center;
      }
      img {
        border: 2px solid #333333;
        max-width: 100%;
      }
    }
  }
}
</style>
