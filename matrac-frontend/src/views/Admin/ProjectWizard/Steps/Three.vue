<template lang="pug">
  .manage-users
    user-list(:users="userList", :selected="this.activeProject.Users",
      :clickable="true",
      @user-click="addUser")
    div
      user-form(@submit="genUsers")
    .nav
      button(@click="prevStep") Previous
      button(@click="nextStep") Next
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';

export default {
  components: { UserList, UserForm },
  props: ['project'],
  name: 'LinkUsers',
  computed: {
    ...mapState('user', ['userList']),
    ...mapState('project', ['projectList']),
    ...mapGetters('wizard', ['activeProject']),
  },
  methods: {
    ...mapActions('project', ['fetchProjects']),
    ...mapActions('wizard', ['setActiveProject']),
    ...mapActions('user', ['fetchUsers', 'generateUsers', 'addUserToProject']),
    ...mapActions('app', ['error']),
    async addUser(user) {
      await this.addUserToProject({
        project: this.activeProject.Name,
        user: user.Pin,
      });
      await Promise.all([this.fetchProjects(), this.fetchUsers()]);
    },
    async genUsers(howMany) {
      await this.generateUsers(howMany);
      await this.fetchUsers();
    },
    prevStep() {
      this.$router.push(`/admin/project-wizard/link-dataset/${encodeURIComponent(this.project)}`);
    },
    nextStep() {
      this.$router.push(`/admin/project-wizard/project-type/${encodeURIComponent(this.project)}`);
    },
  },
  watch: {
    activeProject(newVal) {
      if (newVal && newVal.Users.length) {
        this.$emit('valid', true);
      }
    },
  },
  async mounted() {
    const pr = this.projectList.find(p => p.Name === this.project);
    await this.setActiveProject(pr);
    await this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  grid-column-start: 1;
  grid-column-end: 3;
}
.manage-users {
  display: grid;
  gap: 20px;
  grid-template-columns: 8fr 1fr;
  div button {
    margin-top: 50px;
  }
}
</style>
