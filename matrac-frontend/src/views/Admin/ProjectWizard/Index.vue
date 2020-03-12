<template lang="pug">
  .container
    .title
      h1 {{$router.currentRoute.name}}
    .wizard
      template(v-if="showModal")
        modal(@close="showModal= false")
          .modal-body(slot="default")
            h2 Are you sure you want to leave the wizard?
            p Progress will be lost if you don't finish the wizard
            button(@click="nextFunction") Yes, leave
            button(@click="showModal=false") No, stay
      template(v-if="showStart")
        p This wizard will guide you through the creation of an annotation project.
          | The steps are easy:
        ol
          li Create a project, and the associated set of tags.
          li Upload a new dataset or associate your project with a previously uploaded one.
          li Select a set of users that can annotate your project.
          li Select the type of annotation task from the growing list of predefined types.
          li ...
          li That's it... You're done! 😃
        router-link.start(to="/admin/project-wizard/create-project") Start
      template(v-else)
        router-view
</template>
<script>
import Modal from '@/components/Modal.vue';

export default {
  components: { Modal },
  name: 'ProjectWizard',
  data() {
    return {
      showModal: false,
      nextFunction: null,
      showStart: this.$router.currentRoute.path.replace(/\/$/, '') === '/admin/project-wizard',
    };
  },
  watch: {
    $route(to) {
      this.showStart = to.path.replace(/\/$/, '') === '/admin/project-wizard';
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.path.replace(/\/$/, '') !== '/admin/project-wizard/done') {
      this.nextFunction = next;
      this.showModal = true;
    } else {
      next();
    }
  },
};
</script>
<style lang="scss" scoped>
.container{
  display:grid;
  grid-template-columns: 2fr 8fr 2fr;
  .title{
    text-align: center;
    grid-column: 2;
  }
  .wizard{
    grid-column: 2;
    border: 2px solid #333333;
    border-radius: 10px;
    padding: 20px;
    font-size: 1.3em;
  }
  .modal-body {
    margin-top: 30px;
    width: 100%;
    max-height: 200px;
    text-align:center;
    background-color: #ffffff;
    padding: 30px;
    border: 2px solid #333333;
    border-radius: 10px;
    z-index: 200;
    button{
      margin: 20px 30px 0 30px;
    }
  }
}

</style>
