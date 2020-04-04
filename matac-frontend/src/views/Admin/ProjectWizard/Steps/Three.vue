<template lang="pug">
  .wrapper
    instructions
      p To associate users to the project simply click the row in the table that represents the
        |  user you want to add.
      p If you need to generate new users, use the panel on the right.
        |  Type the number of users you want to generate and click the generate button.
      p Currently M ATAC does not provide you with a way of communicating with the users,
        |  so if you want to send them their pin, you might want to write down the generated pins.
        |  The list of users will always be available from the
        router-link.regular-link(to="/admin/manage-users") manage users panel
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
import Instructions from '@/components/Instructions.vue';

export default {
  components: { UserList, UserForm, Instructions },
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
  padding-top:10px;
  display: grid;
  gap: 20px;
  grid-template-columns: 8fr 1fr;
  div button {
    margin-top: 50px;
  }
}
.regular-link{
    border:none;
    padding: 0;
    padding-left: 2px;
    background: none;
    &:hover{
      background: none;
    }
  }
</style>
