<template lang="pug">
  component(v-if="switched", :is="switched")
</template>
<script>
import WizardSidebar from './WizardSidebar.vue';

export default {
  name: 'SidebarSwitcher',
  computed: {
    switched() {
      if (this.$route.matched.find(r => r.path === '/admin/project-wizard')) {
        return WizardSidebar;
      }
      return null;
    },
  },
};
</script>
