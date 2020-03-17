<template lang="pug">
  .manage-users
    h1 Manage Users
    .content
      user-list.list(:users="userList", :selected="[user]", extraRowText="Logged in")
      user-form(@submit="sendForm")
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'ManageUsers',
  components: { UserList, UserForm },
  data() {
    return {
      howMany: 1,
    };
  },
  computed: {
    ...mapState('user', ['userList', 'user']),
  },
  methods: {
    ...mapActions('user', ['fetchUsers', 'generateUsers']),
    ...mapActions('app', ['error']),
    async sendForm(howMany) {
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
  text-align: center;
  margin-top: 60px;
  .content {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 6fr 1fr;
    gap: 50px;
    padding-left: 5em;
    padding-right: 5em;
  }
}
</style>
