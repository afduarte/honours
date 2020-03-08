<template lang="pug">
  .manage-users
    user-list(:users="userList", @user-click="addUser")

    user-form(@submit="genUsers")
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';

export default {
  components: { UserList, UserForm },
  name: 'LinkUsers',
  data() {
    return {
    };
  },
  computed: {
    ...mapState('user', ['userList']),
    ...mapGetters('wizard', ['activeProject']),
  },
  methods: {
    ...mapActions('user', ['fetchUsers', 'generateUsers', 'addUserToProject']),
    ...mapActions('app', ['error']),
    async addUser(user) {
      await this.addUserToProject({
        project: this.activeProject.Name,
        user: user.Pin,

      });
    },
    async genUsers(howMany) {
      await this.generateUsers(howMany);
      await this.fetchUsers();
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
.manage-users {
  display: flex;
  flex-direction: column;
}
</style>
