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
        .instructions
          p This wizard will guide you through the creation of a new project.
          p An Annotation Project is defined by a name and
            |  a set of tags that annotators will be able to select from to classify the data as.
          p A project needs to have an associated dataset. This is where unlabelled data items
            |  will be taken and presented to an annotator to annotate.
          p Once your project has a dataset, you can associate users to it.
            |  These will be the annotators. They are identified by a pin number.
            |  As the administrator, you should contact them and give them their pin
            |  which they can use to log in to the system.
          p Finally, you will be asked to select the type of project that better suits your needs.
            |  Currently the system supports single and multi-label classification tasks.
        p So, quick recap:
        ol
          li Project: Create a project, and the associated set of tags.
          li Dataset: Upload a new dataset or associate your project with a previously uploaded one.
          li Users: Select a set of users that can annotate your project.
          li Task Type: Select the type of annotation task from the list of predefined types.
          li ...
          li That's it... You're done! 😃
        .start
          router-link(to="/admin/project-wizard/create-project") I'm ready!
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
  .start{
    text-align:center;
    margin: 40px 0;
    a {
      font-size: 1.3em;
      padding: 20px 30px;
    }
  }
  .wizard{
    grid-column: 2;
    border: 2px solid #333333;
    border-radius: 10px;
    padding: 20px;
    font-size: 1.3em;
    .instructions {
      font-size: 0.85em;
    }
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
