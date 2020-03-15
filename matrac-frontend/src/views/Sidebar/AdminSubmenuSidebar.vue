<template lang="pug">
  .links
    router-link(@click.native="$event.stopImmediatePropagation()",
      to="/admin/project-wizard") New Project Wizard
    router-link(@click.native="$event.stopImmediatePropagation()",
      to="/admin/manage-users") Manage Users
    router-link(@click.native="$event.stopImmediatePropagation()",
      to="/admin/manage-projects") Manage Projects
    router-link(@click.native="$event.stopImmediatePropagation()",
      to="/admin/manage-datasets") Manage Datasets
</template>

<style lang="scss" scoped>
.links{
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  a{
    margin-left: 35px;
    margin-bottom: 10px;
  }
}
</style>
