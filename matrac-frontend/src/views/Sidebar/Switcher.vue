<template lang="pug">
  component(v-if="switched", :is="switched")
</template>
<script>
import WizardSidebar from './WizardSidebar.vue';
import AnnotationSidebar from './AnnotationSidebar.vue';

export default {
  name: 'SidebarSwitcher',
  computed: {
    switched() {
      if (this.$route.matched.find(r => r.path === '/admin/project-wizard')) {
        return WizardSidebar;
      }
      if (this.$route.matched.find(r => r.path.indexOf('/annotate') > -1)) {
        return AnnotationSidebar;
      }
      return null;
    },
  },
};
</script>
