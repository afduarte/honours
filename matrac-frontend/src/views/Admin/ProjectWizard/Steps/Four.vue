<template lang="pug">
  .select-type
    .types
      .type(v-for="(v,k) in available", @click="selected = k", :class="{active:k === selected}")
        h2 {{v.name}}
        img(:src="v.image")
        p {{v.description}}
    button(@click="nextStep", :disabled="!selected") Finish

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';
import AnnotationComponents from '@/components/Annotation';

export default {
  components: { UserList, UserForm },
  name: 'SetAnnotationType',
  data() {
    return {
      available: AnnotationComponents,
      selected: null,
    };
  },
  computed: {
    ...mapGetters('wizard', ['activeProject']),
  },
  methods: {
    ...mapActions('project', ['fetchProjects', 'updateAnnotationType']),
    ...mapActions('app', ['error']),
    async nextStep() {
      await this.updateAnnotationType({
        project: this.activeProject.Name,
        annotationType: this.selected,
      });
      this.$router.push('/admin/project-wizard/done');
    },
  },
  async mounted() {
    await Promise.all([this.fetchProjects()]);
  },
};
</script>

<style lang="scss" scoped>
.select-type {
  display: flex;
  flex-direction: column;
  .types {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    .type {
      padding: 5px;
      &.active {
        padding: 2px;
        border: 3px solid #333333;
      }
      h2 {
        text-align: center;
      }
      img {
        max-width: 100%;
      }
    }
  }
}
</style>
