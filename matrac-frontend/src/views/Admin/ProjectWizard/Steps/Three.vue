<template lang="pug">
  .manage-users
    user-list(:users="userList", :selected="this.activeProject.Users", @user-click="addUser")
    div
      user-form(@submit="genUsers")
      button(@click="nextStep") Next Step
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';

export default {
  components: { UserList, UserForm },
  name: 'LinkUsers',
  computed: {
    ...mapState('user', ['userList']),
    ...mapGetters('wizard', ['activeProject']),
  },
  methods: {
    ...mapActions('project', ['fetchProjects']),
    ...mapActions('user', ['fetchUsers', 'generateUsers', 'addUserToProject']),
    ...mapActions('app', ['error']),
    async addUser(user) {
      await this.addUserToProject({
        project: this.activeProject.Name,
        user: user.Pin,
      });
      await this.fetchProjects();
    },
    async genUsers(howMany) {
      await this.generateUsers(howMany);
      await this.fetchUsers();
    },
    nextStep() {
      this.$router.push('/admin/project-wizard/project-type');
    },
  },
  async mounted() {
    await Promise.all([
      this.fetchUsers(),
      this.fetchProjects(),
    ]);
  },
};
</script>

<style lang="scss" scoped>
.manage-users {
  display: grid;
  gap: 20px;
  grid-template-columns: 8fr 1fr;
  div button {
    margin-top: 50px;
  }
}
</style>
