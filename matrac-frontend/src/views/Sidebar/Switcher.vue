<template lang="pug">
  component(v-if="switched", :is="switched")
</template>
<script>
import WizardSidebar from './WizardSidebar.vue';
import AdminSubmenuSidebar from './AdminSubmenuSidebar.vue';

export default {
  name: 'SidebarSwitcher',
  computed: {
    switched() {
      if (this.$route.matched.find(r => r.path === '/admin/project-wizard')) {
        return WizardSidebar;
      }
      if (this.$route.path.indexOf('/admin') > -1) {
        return AdminSubmenuSidebar;
      }
      return null;
    },
  },
};
</script>
