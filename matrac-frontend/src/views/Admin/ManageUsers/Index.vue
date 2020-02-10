<template lang="pug">
  .manage-users
    .user-list
      template(v-for="user in userList")
        .user
          p ID: {{user.Pin}}
          p Role: {{user.Role}}
    form.add-users
      h3 Generate Users
      p Add Users
      input(type="number", min="1", max="100", v-model="howMany")
      button(type="submit",@click.prevent="sendForm") Submit
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ManageUsers',
  data() {
    return {
      howMany: 1,
    };
  },
  computed: {
    ...mapState('user', ['userList']),
  },
  methods: {
    ...mapActions('user', ['fetchUsers', 'generateUsers']),
    ...mapActions('app', ['error']),
    async sendForm() {
      await this.generateUsers(this.howMany);
      this.howMany = 1;
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
  flex-direction: row;
  .user-list,
  .add-users {
    flex-grow: 1;
  }
  .user-list {
    display: flex;
    flex-direction: column;
    .user {
      display: flex;
      flex-direction: row;
      justify-content:space-around;
    }
  }
}
</style>
