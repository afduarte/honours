<template lang="pug">
  component(v-if="switched", :is="switched")
</template>
<script>
import WizardSidebar from './WizardSidebar.vue';
import AnnotationSidebar from './AnnotationSidebar.vue';
import AdminSubmenuSidebar from './AdminSubmenuSidebar.vue';

export default {
  name: 'SidebarSwitcher',
  computed: {
    switched() {
      console.log(this.$route);
      if (this.$route.matched.find(r => r.path === '/admin/project-wizard')) {
        return WizardSidebar;
      }
      if (this.$route.path.indexOf('/admin') > -1) {
        return AdminSubmenuSidebar;
      }
      if (this.$route.matched.find(r => r.path.indexOf('/annotate/project/') > -1)) {
        return AnnotationSidebar;
      }
      return null;
    },
  },
};
</script>
